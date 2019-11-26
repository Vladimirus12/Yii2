<aside class="main-sidebar">

    <section class="sidebar">

        <?php $directoryAsset = Yii::$app->assetManager->getPublishedUrl('@web/img'); ?>
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="<?= $directoryAsset ?>/img/developer.png" class="img-circle" alt="User Image"/>
            </div>
            <div class="pull-left info">
                <p>Web Developer</p>

                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <?= dmstr\widgets\Menu::widget(
            [
                'options' => ['class' => 'sidebar-menu tree', 'data-widget' => 'tree'],
                'items' => [
                    ['label' => 'Task tracker', 'options' => ['class' => 'header']],
                    ['label' => 'Users', 'icon' => 'users', 'url' => ['/admin/user/index']],
                    ['label' => 'Tasks', 'icon' => 'tasks', 'url' => ['/admin/tasks/index']],
//                    ['label' => 'Login', 'url' => ['site/login'], 'visible' => Yii::$app->user->isGuest],
                ],
            ]
        ) ?>

    </section>

</aside>