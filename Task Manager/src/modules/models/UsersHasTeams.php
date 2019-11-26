<?php

namespace app\modules\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "users_has_teams".
 *
 * @property int $users_id id пользователя
 * @property int $teams_id id команды
 * @property int $archive 1 - в архиве, 0 (по умолчанию) - нет
 *
 * @property Teams $teams
 * @property Users $users
 */
class UsersHasTeams extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users_has_teams';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['users_id', 'teams_id'], 'required'],
            [['users_id', 'teams_id', 'archive'], 'integer'],
            [['teams_id'], 'exist', 'skipOnError' => true, 'targetClass' => Teams::className(),
                'targetAttribute' => ['teams_id' => 'id']],
            [['users_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(),
                'targetAttribute' => ['users_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'users_id' => 'Users ID',
            'teams_id' => 'Teams ID',
            'archive' => 'Archive'
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getTeams()
    {
        return $this->hasOne(Teams::className(), ['id' => 'teams_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasOne(Users::className(), ['id' => 'users_id']);
    }
}