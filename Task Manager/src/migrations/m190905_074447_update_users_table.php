<?php

use yii\db\Migration;

/**
 * Class m190905_074447_update_users_table
 */
class m190905_074447_update_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('users', 'access_token', $this->string(255)->
        after('password')->comment("токен авторизации"));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('users', 'access_token');
    }
}