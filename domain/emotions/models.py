from django.db import models

class Member(models.Model):
    user_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    img = models.IntegerField()
    refresh_token = models.CharField(max_length=100)
    email = models.EmailField(max_length=40)
    classic = models.SmallIntegerField(default=False)
    jazz = models.SmallIntegerField(default=False)
    pop = models.SmallIntegerField(default=False)
    hiphop = models.SmallIntegerField(default=False)
    reggae = models.SmallIntegerField(default=False)
    RnB = models.SmallIntegerField(default=False)
    electronic = models.SmallIntegerField(default=False)

    class Meta:
        db_table = 'member'
        managed = False

class Emotion(models.Model):
    id = models.AutoField(primary_key=True)
    large_category = models.CharField(max_length=30, unique=True)

    class Meta:
        db_table = 'emotion'
        managed = False

class Flower(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    language = models.CharField(max_length=100, null=True)
    eid = models.ForeignKey(Emotion, on_delete=models.CASCADE,db_column='eid')
    small_category = models.CharField(max_length=15)

    class Meta:
        db_table = 'flower'
        managed = False

class Music(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)

    class Meta:
        db_table = 'music'
        managed = False

class Garden(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.ForeignKey(Member, on_delete=models.CASCADE,db_column='uid')
    deadline = models.DateTimeField()
    created_time = models.DateTimeField(auto_now_add=True)
    mid = models.ForeignKey(Music, on_delete=models.CASCADE,db_column='mid')
    type = models.IntegerField()

    class Meta:
        db_table = 'garden'
        managed = False


class Diary(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    img_src = models.CharField(max_length=40, null=True)
    lat = models.FloatField()
    lng = models.FloatField()
    public_status = models.CharField(max_length=20)
    fid = models.ForeignKey(Flower, on_delete=models.CASCADE,db_column='fid')
    x = models.CharField(max_length=10)
    y = models.CharField(max_length=10)
    z = models.CharField(max_length=10)
    gid = models.ForeignKey(Garden, on_delete=models.CASCADE,db_column='gid')
    mid = models.ForeignKey(Music, on_delete=models.CASCADE,db_column='mid')
    created_time = models.DateTimeField()
    address = models.CharField(max_length=50, null=True)

    class Meta:
        db_table = 'diary'
        managed = False