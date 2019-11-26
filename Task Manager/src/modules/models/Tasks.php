<?php

namespace app\modules\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "tasks".
 *
 * @property int $id
 * @property string $name Название задачи
 * @property string $description Описание задачи
 * @property int $status Статус задачи
 * @property int $status_index
 * @property int $creator_id id инициатора
 * @property int $responsible_id id исполнителя
 * @property int $project_id id проекта
 * @property string $deadline Срок решения задачи
 * @property int $archive 1 - в архиве, 0 (по умолчанию) - нет
 *
 * @property Users $creator
 * @property Projects $project
 * @property Users $responsible
 */
class Tasks extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tasks';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
//            [['name', 'status', 'creator_id', 'responsible_id', 'project_id'], 'required'],
            [['status', 'status_index', 'creator_id', 'responsible_id', 'project_id', 'archive'], 'integer'],
            [['deadline'], 'safe'],
            [['name'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['creator_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(),
                'targetAttribute' => ['creator_id' => 'id']],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Projects::className(),
                'targetAttribute' => ['project_id' => 'id']],
            [['responsible_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(),
                'targetAttribute' => ['responsible_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'description' => 'Description',
            'status' => 'Status',
            'status_index' => 'Status index',
            'creator_id' => 'Creator ID',
            'responsible_id' => 'Responsible ID',
            'project_id' => 'Project ID',
            'deadline' => 'Deadline',
            'archive' => 'Archive'
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getCreator()
    {
        return $this->hasOne(Users::className(), ['id' => 'creator_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Projects::className(), ['id' => 'project_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getResponsible()
    {
        return $this->hasOne(Users::className(), ['id' => 'responsible_id']);
    }
}