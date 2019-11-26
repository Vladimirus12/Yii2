<?php

namespace app\modules\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $username Имя пользователя
 * @property string $password Пароль
 * @property string $email email пользователя
 * @property int $status статус пользователя
 *
 * @property Projects[] $projects
 * @property Tasks[] $tasks
 * @property Tasks[] $tasks0
 * @property UsersHasTeams[] $usersHasTeams
 * @property string $access_token [varchar(255)]
 */
class Users extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'password', 'email'], 'required'],
            [['username', 'password', 'email'], 'string', 'max' => 255],
            [['status'], 'integer'],
            [['username'], 'unique'],
            [['email'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'password' => 'Password',
            'email' => 'Email',
            'status' => 'Status'
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getProjects()
    {
        return $this->hasMany(Projects::className(), ['creator_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getTasks()
    {
        return $this->hasMany(Tasks::className(), ['creator_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getTasks0()
    {
        return $this->hasMany(Tasks::className(), ['responsible_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getUsersHasTeams()
    {
        return $this->hasMany(UsersHasTeams::className(), ['users_id' => 'id']);
    }
}