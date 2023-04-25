import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
import pandas as pd

import sys, os
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

#transformers
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup


import multiprocessing



#cpu로 설정
device = torch.device("cpu")


# 데이터가 KoBERT 모델의 입력으로 들어갈 수 있는 형태가 되도록 토큰화, 정수 인코딩, 패딩, 어텐션 마스크 만들기 등을 해준다
class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                 pad, pair):

        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))

# kobert 학습모델 만들기
class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=7,   # 분류 클래스 수
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate
                 
        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)
    
    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)
        
        pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))[1]
        #bert model returns 'last_hidden_state' and 'pooler_output'

        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)
    




#새로운 문장 테스트

max_len = 64


def predict(predict_sentence):
    max_len = 64
    batch_size = 64

    #BERT 모델, Vocabulary 불러오기
    bertmodel, vocab = get_pytorch_kobert_model()

    # BERT 모델 설정
    model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device) 
    checkpoint=torch.load('model.pt', map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])

    #토큰화
    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    data = [predict_sentence, '0']
    dataset_another = [data]


    # TensorDataset(inputs, labels, attention masks 포함)으로 만들어주기
    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)

    # 배치, 데이터 로더 설정
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=2)

    model.eval()

    with torch.no_grad():

        for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):

            token_ids = token_ids.long().to(device)
            segment_ids = segment_ids.long().to(device)

            valid_length= valid_length
            label = label.long().to(device)

            out = model(token_ids, valid_length, segment_ids)


            test_eval=[]
            for i in out:
                logits = i
                logits = logits.detach().cpu().numpy() # graph에서 분리한 새로운 tensor를 return -> cpu 메모리로 옮기기 -> np list로 만들기

                if np.argmax(logits) == 0:
                    test_eval.append("기쁨이")
                elif np.argmax(logits) == 1:
                    test_eval.append("안정이")
                elif np.argmax(logits) == 2:
                    test_eval.append("당황이")
                elif np.argmax(logits) == 3:
                    test_eval.append("분노가")
                elif np.argmax(logits) == 4:
                    test_eval.append("불안이")
                elif np.argmax(logits) == 5:
                    test_eval.append("상처가")
                elif np.argmax(logits) == 6:
                    test_eval.append("슬픔이")

            print(">> 입력하신 내용에서 " + test_eval[0] + " 느껴집니다.")
            print(logits)


if __name__ == '__main__':
    multiprocessing.freeze_support()
    predict(input("하고싶은 말을 입력해주세요 : "))
