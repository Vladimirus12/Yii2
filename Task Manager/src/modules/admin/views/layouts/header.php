<?php

use yii\helpers\Html;
use yii\web\View;

/* @var $this View */
/* @var $content string */
?>

<header class="main-header">

    <?php $directoryAsset = Yii::$app->assetManager->getPublishedUrl('@web/img'); ?>

    <?= Html::a('<span class="logo-mini">TT</span><span class="logo-lg">' .
        Yii::$app->name = 'Task tracker' . '</span>', Yii::$app->homeUrl = 'http://admin.kapa16.com',
        ['class' => 'logo']) ?>

    <nav class="navbar navbar-static-top" role="navigation">

        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>

        <div class="navbar-custom-menu">

            <ul class="nav navbar-nav">
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="<?= $directoryAsset ?>/img/developer.png" class="user-image" alt="User Image"/>
                        <span class="hidden-xs">Web Developer</span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header">
                            <img src="<?= $directoryAsset ?>/img/developer.png" class="img-circle"
                                 alt="User Image"/>
                            <p>
                                Web Developer
                                <small>Member since August. 2019</small>
                            </p>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">Profile</a>
                            </div>
                            <div class="pull-right">
                                <?= Html::a(
                                    'Sign out',
                                    ['/site/logout'],
                                    ['data-method' => 'post', 'class' => 'btn btn-default btn-flat']
                                ) ?>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</header>