<?php

use yii\db\Migration;

/**
 * Class m190904_095101_create_tables
 */
class m190904_095101_create_tables extends Migration

{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('users', [
            'id' => $this->primaryKey(),
            'username' => $this->string(255)->notNull()->unique()->comment("имя пользователя"),
            'password' => $this->string(255)->notNull()->comment("хэш пароля"),
            'email' => $this->string(255)->notNull()->unique()->comment("email пользователя"),
            'status' => $this->integer(11)->defaultValue(0)->comment("статус пользователя")
        ]);

        $this->createTable('teams', [
            'id' => $this->primaryKey(),
            'name' => $this->string(50)->notNull()->comment("имя команды"),
            'archive' => $this->integer(1)->defaultValue(0)->
            comment("1 - в архиве, 0 (по умолчанию) - нет")
        ]);

        $this->createTable('users_has_teams', [
            'users_id' => $this->integer(11)->notNull()->comment("id пользователя"),
            'teams_id' => $this->integer(11)->notNull()->comment("id команды"),
            'archive' => $this->integer(1)->defaultValue(0)->
            comment("1 - в архиве, 0 (по умолчанию) - нет")
        ]);

        $this->createTable('tasks', [
            'id' => $this->primaryKey(),
            'name' => $this->string(50)->notNull()->comment("название задачи"),
            'description' => $this->string(255)->comment("описание задачи"),
            'status' => $this->integer(11)->defaultValue(1)->comment("статус задачи"),
            'creator_id' => $this->integer(11)->comment("id инициатора"),
            'responsible_id' => $this->integer(11)->comment("id исполнителя"),
            'project_id' => $this->integer(11)->comment("id проекта"),
            'deadline' => $this->dateTime()->comment("срок решения задачи"),
            'archive' => $this->integer(1)->defaultValue(0)->
            comment("1 - в архиве, 0 (по умолчанию) - нет")
        ]);

        $this->createTable('projects', [
            'id' => $this->primaryKey(),
            'creator_id' => $this->integer(11)->notNull()->comment("id инициатора"),
            'name' => $this->string(50)->notNull()->comment("название проекта"),
            'description' => $this->string(255)->comment("описание проекта"),
            'status' => $this->integer(11)->defaultValue(1)->comment("статус проекта"),
            'team_id' => $this->integer(11)->notNull()->comment("id команды"),
            'deadline' => $this->dateTime()->comment("срок завершения проекта"),
            'archive' => $this->integer(1)->defaultValue(0)->
            comment("1 - в архиве, 0 (по умолчанию) - нет")
        ]);

        $this->addForeignKey('fk_users_has_teams_users', 'users_has_teams', 'users_id',
            'users', 'id', 'cascade', 'no action');
        $this->addForeignKey('fk_users_has_teams_teams', 'users_has_teams', 'teams_id',
            'teams', 'id', 'cascade', 'no action');
        $this->addForeignKey('fk_creator_task_id', 'tasks', 'creator_id', 'users',
            'id', 'cascade', 'no action');
        $this->addForeignKey('fk_responsible_task_id', 'tasks', 'responsible_id',
            'users', 'id', 'cascade', 'no action');
        $this->addForeignKey('fk_project_id', 'tasks', 'project_id', 'projects',
            'id', 'cascade', 'no action');
        $this->addForeignKey('fk_projects_teams', 'projects', 'team_id', 'teams',
            'id', 'cascade', 'no action');
        $this->addForeignKey('fk_projects_creators', 'projects', 'creator_id', 'users',
            'id', 'cascade', 'no action');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_users_has_teams_users', 'users_has_teams');
        $this->dropForeignKey('fk_users_has_teams_teams', 'users_has_teams');
        $this->dropForeignKey('fk_creator_task_id', 'tasks');
        $this->dropForeignKey('fk_responsible_task_id', 'tasks');
        $this->dropForeignKey('fk_project_id', 'tasks');
        $this->dropForeignKey('fk_projects_teams', 'projects');
        $this->dropForeignKey('fk_projects_creators', 'projects');

        $this->dropTable('users');
        $this->dropTable('teams');
        $this->dropTable('users_has_teams');
        $this->dropTable('tasks');
        $this->dropTable('projects');
    }
}