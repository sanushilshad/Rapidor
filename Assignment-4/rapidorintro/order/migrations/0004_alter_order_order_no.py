# Generated by Django 3.2.5 on 2021-07-12 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_alter_order_grand_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_no',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]