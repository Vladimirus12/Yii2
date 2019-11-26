<?php

namespace app\models;

use http\Exception\RuntimeException;
use Yii;
use yii\base\InvalidArgumentException;
use yii\base\UserException;
use yii\db\ActiveRecord;
use yii\db\Exception;
use yii\web\IdentityInterface;

/**
 *
 * @property mixed $authKey
 * @property int $id [int(11)]
 * @property string $username [varchar(255)]  имя пользователя
 * @property string $password [varchar(255)]  хэш пароля
 * @property string $access_token [varchar(255)]  токен авторизации
 * @property string $email [varchar(255)]  email пользователя
 * @property int $status [int(11)]  статус пользователя
 */
class User extends ActiveRecord implements IdentityInterface
{
    public const SCENARIO_LOGIN = 'login';
    public const SCENARIO_REGISTER = 'register';

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
            [['username', 'password', 'email'], 'required',],
            [['username'], 'string', 'max' => 50],
            [['password'], 'string', 'max' => 255],
            [['email'], 'email'],
            ['email', 'unique', 'targetClass' => self::class, 'message' => 'User already exist'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'password' => 'Password',
        ];
    }

    public function fields()
    {
        $fields = parent::fields();
        if (self::SCENARIO_LOGIN || self::SCENARIO_REGISTER) {
            unset($fields['password']);
        }
        return $fields;
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }





    public static function findByPasswordResetToken($token)
    {

        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    public static function isPasswordResetTokenValid($token)
    {

        if (empty($token)) {
            return false;
        }

        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }






    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }

    public static function findByUsernameOrEmail($usernameEmail)
    {
        return static::find()
            ->where(['or', ['username' => $usernameEmail], ['email' => $usernameEmail]])
            ->one();
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->authKey;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     * @throws UserException
     */
    public function validatePassword($password): ?bool
    {
        try {
            return Yii::$app->security->validatePassword($password, $this->password);
        } catch (InvalidArgumentException $e) {
            throw new UserException('Password incorrect');
        }
    }

    public function setPassword($password)
    {
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateAccessToken()
    {
        $this->access_token = Yii::$app->security->generateRandomString();
    }

}
