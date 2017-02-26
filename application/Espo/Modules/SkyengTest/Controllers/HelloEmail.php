<?php

namespace Espo\Modules\SkyengTest\Controllers;

class HelloEmail extends \Espo\Core\Controllers\Base
{
    public function actionIndex($params, $data, $request)
    {
        $state = 1;
        try {
            $emailAddress = $data['email'];
            if (empty($emailAddress)) {
                return;
            }
            // TODO добавить валидацию email

            $mailSender = $this->getContainer()->get('mailSender')->useGlobal();
            $entityManager = $this->getContainer()->get('entityManager');

            $email = $entityManager->getEntity('Email');

            $email->set('to', $emailAddress);
            $email->set('subject', 'Привет для Skyeng!');
            $email->set('body', 'Привет для Skyeng!');
            $email->set('isHtml', false);
            $entityManager->saveEntity($email);

            $mailSender->send($email);

            $entityManager->removeEntity($email);
            $state = 0;

        } catch (\Exception $exc) {}

        return ['state' => $state];
    }
}
