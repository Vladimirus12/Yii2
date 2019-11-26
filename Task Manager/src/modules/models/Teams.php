<?php

namespace app\modules\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "teams".
 *
 * @property int $id
 * @property string $name Имя команды
 * @property int $archive 1 - в архиве, 0 (по умолчанию) - нет
 *
 * @property Projects[] $projects
 * @property UsersHasTeams[] $usersHasTeams
 */
class Teams extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'teams';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 50],
            [['archive'], 'integer'],
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
            'archive' => 'Archive'
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getProjects()
    {
        return $this->hasMany(Projects::className(), ['team_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getUsersHasTeams()
    {
        return $this->hasMany(UsersHasTeams::className(), ['teams_id' => 'id']);
    }
}