<?php

namespace app\modules\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "projects".
 *
 * @property int $id
 * @property int $creator_id id инициатора
 * @property string $name Название проекта
 * @property string $description Описание проекта
 * @property int $status Статус проекта
 * @property int $team_id id команды
 * @property string $deadline Срок завершения проекта
 * @property int $archive 1 - в архиве, 0 (по умолчанию) - нет
 *
 * @property Users $creator
 * @property Teams $team
 * @property Tasks[] $tasks
 */
class Projects extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'projects';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['creator_id', 'name'], 'required'],
            [['creator_id', 'team_id', 'status', 'archive'], 'integer'],
            [['deadline'], 'safe'],
            [['name'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['creator_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(),
                'targetAttribute' => ['creator_id' => 'id']],
            [['team_id'], 'exist', 'skipOnError' => true, 'targetClass' => Teams::className(),
                'targetAttribute' => ['team_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'creator_id' => 'Creator ID',
            'name' => 'Name',
            'description' => 'Description',
            'status' => 'Status',
            'team_id' => 'Team ID',
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
    public function getTeam()
    {
        return $this->hasOne(Teams::className(), ['id' => 'team_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getTasks()
    {
        return $this->hasMany(Tasks::className(), ['project_id' => 'id']);
    }
}