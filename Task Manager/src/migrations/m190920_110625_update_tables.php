<?php

use yii\db\Migration;

/**
 * Class m190920_110625_update_tables
 */
class m190920_110625_update_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('tasks', 'status_index', $this->integer()->
        after('status'));

        $this->execute('SET foreign_key_checks = 0;');

        $this->truncateTable('teams');
        $this->truncateTable('projects');

        $this->createTable('statuses', [
            'id' => $this->primaryKey(),
            'name' => $this->string(50)->notNull()->comment('имя статуса'),
            'project_id' => $this->integer(11)->comment("id проекта"),
            'project_index' => $this->integer()
        ]);
        $this->insert('teams', ['name' => 'Test']);
        $this->insert('projects', ['creator_id' => 1, 'name' => 'Test', 'team_id' => 1]);

        $this->insert('statuses', ['name' => 'created', 'project_id' => 1]);

        $this->addForeignKey('fk_tasks_statuses', 'tasks', 'status', 'statuses',
            'id', 'cascade', 'no action');
        $this->addForeignKey('fk_statuses_project_id', 'statuses', 'project_id', 'projects',
            'id', 'cascade', 'no action');

        $this->execute('SET foreign_key_checks = 1;');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('tasks', 'status_index');

        $this->execute('SET foreign_key_checks = 0;');
        $this->truncateTable('teams');
        $this->truncateTable('projects');

        $this->dropForeignKey('fk_tasks_statuses', 'tasks');
        $this->dropForeignKey('fk_statuses_project_id', 'statuses');

        $this->dropTable('statuses');
        $this->execute('SET foreign_key_checks = 0;');
    }
}