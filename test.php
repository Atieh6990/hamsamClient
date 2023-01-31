<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of manager
 *
 * @author ali
 */
require_once 'model/pageshowMdl.php';
require_once 'model/clickMdl.php';
require_once 'clickCtrl.php';
require_once 'controller/poll/pollCtrl.php';

class manager {

    //put your code here
    public $obj;
    public $post_data = array();
    public $pageNum;
    public $view2;
    public $rsQuery;
    public $pollObj;
    public $resultPoll;
    public $logTime;

    function handeler() {
        $param = new libs();

        $type = $param->prepareParam('type');



        switch ($type) {
            case "insert":

                $userId = '';
                $data = $param->prepareParam('data');
                //$cnttime = $param->prepareParam('cnttime');

                $cntPage = $param->prepareParam('cntPage');
                //echo $data;
                //$param->savelog_raw(1, $data);
                //   $data = '{"page":"one","userId":"129","appId":"60","actPage":1}';
                if ($data != "") {
                    $obj = json_decode($data, true);
                    if (isset($obj['page'])) {
                        $page = $obj['page'];
                    } else {
                        $page = "1";
                    }
                    $type = $obj['actPage'];
                    $app_fk = $obj['appId'];
                    $user_fk = $obj['userId'];
                    $cnttime = $obj['cntTime'];
                    //$cnt = $obj['cnt'];
                    $timeDate = date("Y-m-d H:i:s");
                    $path = $user_fk;
                    $param->savelog_raw($path, $data);
                    //   $param->savelog_debug($user_fk . '--.--' . $app_fk);



                    $periodNum = file_get_contents("./periodssnapps.txt", 1);




                    $time_start2 = microtime(true); //be hengame voorood
                    //  $this->rsQuery = new rsQuery();
                    // $this->rsQuery->insertClick($user_fk, $app_fk, $type, $timeDate, $page, $periodNum);
                    $time_end2 = microtime(true);

                    //$execution_time2 = ($time_end2 - $time_start2) / 60;
                    // $elapsed_time2 = ($time_end2 - $time_start2);
                    //$str2 = 'start->' . $time_start2 . ',end->' . $time_end2 . ',$elapsed_time->' . $elapsed_time2 . '<br>' . '<n>' . '\r\n';
                    $param->savelog_monitor('insertclick', $time_start2, $time_end2, $user_fk);
                    //   $param->savelog_monitor('insertclick', $str2);

                    if ((($cnttime == 2 && $type == 2) || $cnttime == 3 || $cnttime == 4 || $cnttime == 5 || $cnttime == 6 || $cnttime == 11) && $user_fk != -1) {// vorood be app
                        //echo '<br> oftad oontoo inja <br>';
                        $this->rsQuery = new rsQuery();
                        /*                         * ***query ezafe shavad**** */
                        $result = $this->rsQuery->getuserScoreNotificationDB($user_fk);
                        if (isset($result[0]['notif_user_score'])) {
                            $userTotallScore = $result[0]['notif_user_score'];
                            $this->logTime = 0;
                            $this->timelogin($userTotallScore);
                        } else {
                            $this->logTime = 0;
                            $result = $this->rsQuery->insertUserNotifDB($user_fk);
                        }

// echo '<Br> time login' . $this->logTime . 'cnt time->' . $cnttime . '<Br>';

                        if ($cnttime == $this->logTime) {        //be hengame voorood
                            //      echo '<br>peeeeekh begisssssssr';
                            $time_start = microtime(true); //be hengame voorood
// echo 'time statrt->'.$time_start;
                            $clickObj = new clickController();
                            $clickObj->updateUserApp($user_fk);

                            $clickObj->clickHandler($user_fk, $app_fk, 1, $periodNum, 1);

                            $time_end = microtime(true);

//$execution_time = ($time_end - $time_start) / 60;
//$elapsed_time = ($time_end - $time_start);
//$str = 'start->' . $time_start . ',end->' . $time_end . ',$elapsed_time->' . $elapsed_time . '<br>' . '<n>' . '\r\n';
                            $param->savelog_monitor('open', $time_start, $time_end, $user_fk);
                        }
                    }




                    if (($cnttime % 5 == 1) && ($cnttime != 1) && $user_fk != -1) {     //mandan dar app
                        if ($type != 3) {

                            $time_start3 = microtime(true);
                            $clickObj = new clickController();
                            $clickObj->clickHandler($user_fk, $app_fk, $type, $periodNum, 0);
                            $time_end3 = microtime(true);
                            $param->savelog_monitor('stay', $time_start3, $time_end3, $user_fk);
                        }
                    }




                    if (isset($obj['pageNum'])) {
                        $this->pageNum = $obj['pageNum'];
                    } else {
                        $this->pageNum = "1";
                    }

                    $this->post_data['error'] = "false";
                    $this->post_data['pageEng'] = $page;
                    $this->post_data['page_number'] = $this->pageNum;

                    $this->appResponse($app_fk, $user_fk, $cnttime, $app_fk);
                } else {
                    $view = '';
                    $post_data2 = array('error' => 'true', 'msg' => 'Params Not Valid', 'view' => htmlspecialchars($view));
                    echo json_encode($post_data2);
                }
                break;
            case "test":


                $ery = $param->prepareParam('ery');
                $clickObj = new clickController();
                $clickObj->testLog(1000, $ery);


                break;

            default:
                break;
        }
    }

    public function appResponse($appID, $user_fk, $time, $app_fk) {
        if ($time <= 2 && $user_fk != -1) {

            $param = new libs();
            $time_startp = microtime(true);
            $this->pollObj = new PollController();
            $this->pollObj->isPollGetValid($appID, $user_fk);
            $time_endp = microtime(true);
            $param->savelog_monitor('poll', $time_startp, $time_endp, $user_fk);
            $this->post_data['is_poll'] = $this->pollObj->pollType;
            if ($this->post_data['is_poll'] == 1) {  //age dasht nazarsanji too db
                $this->post_data['poll_type'] = $this->pollObj->pageShow[0]['poll_type'];
                $this->post_data['poll_id'] = $this->pollObj->pollID;
                $this->post_data['pie'] = $this->pollObj->pieArray;
                require_once 'controller/draw/drawCtrl.php';
                //  echo 'injaaaaaaaaaa';
                $drawObj = new drawController();

                $this->view2 = $drawObj->drawPoll($this->pollObj->pageShow[0]['poll_type'], $this->pollObj->pollQueArray, $this->pollObj->pollAnsArray, $this->pollObj->pageShow);
            }
        } else {
            $this->post_data['is_poll'] = 0;
        }
        switch ($appID) {
            case 1:
                if ($user_fk != -1) {
                    $param = new libs();
                    $time_startn = microtime(true);

                    $this->rsQuery = new rsQuery();
                    $result = $this->rsQuery->getuserNotificationDB($user_fk);
                    $time_endn = microtime(true);
                    $param->savelog_monitor('notif', $time_startn, $time_endn, $user_fk);



                    $this->post_data['user_id'] = $result[0]['notif_user_fk'];
                    $this->post_data['unread_count'] = $result[0]['notif_pm_count'];
                    $this->post_data['friend_count'] = $result[0]['notif_friend_count'];
                    $this->post_data['request_count'] = $result[0]['notif_req_count'];
                    $this->post_data['user_pic'] = $result[0]['notif_user_pic'];
                    $this->post_data['user_pic_status'] = $result[0]['notif_pic_status'];
                    $this->post_data['user_score'] = $result[0]['notif_user_score'];
                }

                /*  $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>
                  Ø¨Ø§ Ù†ØµØ¨ Ùˆ ÙØ¹Ø§Ù„Ø³Ø§Ø²ÛŒ Ø§Ù¾ Ù…ÙˆØ¨Ø§ÛŒÙ„ÛŒ Ù‡Ù…Ø³Ø§Ù… ØŒ Ø¯Ø± Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø¢Ù† Ø´Ø±Ú©Øª Ú©Ù†ÛŒØ¯ <br> Ù„ÛŒÙ†Ú© Ø¯Ø§Ù†Ù„ÙˆØ¯ : http://  hamsam.com/mobile/hamsam.apk

                  </div>

                  <img style='width:200px;float:right;margin-top:-28px;' src='http://ssn.tvapps.ir/alt2/ssnapps/qr3Mob.png'/>
                  </div> "; */

                /* $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>
                  Ø§Ø² Ø­Ø§Ù„ Ùˆ Ù‡ÙˆØ§ÛŒ Ø¨Ù‡Ø§Ø± Ùˆ Ù†ÙˆØ±ÙˆØ² Ø¹Ú©Ø§Ø³ÛŒ Ú©Ù† Ùˆ Ø¨Ø§ Ø´Ø±Ú©Øª Ø¯Ø± Ù…Ø³Ø§Ø¨Ù‚Ù‡ Ø­Ø¯Ø§Ù‚Ù„ 2000  Ùˆ Ø¯Ø±ØµÙˆØ±Øª Ø¨Ø±Ù†Ø¯Ù‡ Ø´Ø¯Ù† 100Ù‡Ø²Ø§Ø± Ø§Ù…ØªÛŒØ§Ø² Ú©Ø³Ø¨ Ú©Ù†.
                  </div>


                  </div> "; */
                /* $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>
                  Ø§Ø² Ú©Ù„Ù…Ø§Øª Ù¾Ø§Ù†ØªÙˆÙ…ÛŒÙ… Ø¨Ø³Ø§Ø²ÛŒØ¯ Ùˆ 5000 Ø§Ù…ØªÛŒØ§Ø² Ø¨Ú¯ÛŒØ±ÛŒØ¯ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ø¨ÛŒØ´ØªØ± Ø¯Ø± Ù„ÛŒÙ†Ú© Ø²ÛŒØ±: <br>
                  hamsam.com/pantomim
                  </div>


                  </div> "; */
                $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> 
                    
Ø§Ù¾ Ù‡Ù…Ø³Ø§Ù… Ø®ÙˆØ¯ Ø±Ø§ Ø¨Ø±ÙˆØ²Ø±Ø³Ø§Ù†ÛŒ Ú©Ù†ÛŒØ¯ ØªØ§ Ø§Ø² Ø§Ù…Ú©Ø§Ù†Ø§Øª Ø¬Ø¯ÛŒØ¯Ø´ Ø¨Ù‡Ø±Ù‡ Ù…Ù†Ø¯ Ø´ÙˆÛŒØ¯
</div>


                  </div> ";

                /*  $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> Ø¬Ù‡Øª Ø¯Ø§Ù†Ù„ÙˆØ¯ Ø§Ù¾Ù„ÛŒÚ©ÛŒØ´Ù† Ø§Ù†Ø¯Ø±ÙˆÛŒØ¯ÛŒ Ù‡Ù… Ø³Ø§Ù… ÙˆÛŒÚ˜Ù‡ Ú¯ÙˆØ´ÛŒ Ù‡Ø§ÛŒ Ù‡Ù…Ø±Ø§Ù‡ØŒ Ø§Ø² Ø·Ø±ÛŒÙ‚  QR Ú©Ø¯ Ø²ÛŒØ± ØŒÛŒØ§ Ù„ÛŒÙ†Ú©  http://  hamsam.com/mobile/hamsam.apk Ø§Ù‚Ø¯Ø§Ù… Ù†Ù…Ø§ÛŒÛŒØ¯.</div>

                  <img style='width:200px;float:right;margin-top:-28px;' src='http://ssn.tvapps.ir/alt2/ssnapps/qr3Mob.png'/>
                  </div> "; */
                /*  $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> Ø¨Ø±Ø§ÛŒ Ø´Ø±Ú©Øª Ø¯Ø± Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ù‡Ù… Ø³Ø§Ù… Ø­ØªÙ…Ø§ Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ø®ÙˆØ¯ Ø±Ø§ Ø¯Ø± Ù¾Ø±ÙˆÙØ§ÛŒÙ„ ØªÚ©Ù…ÛŒÙ„ Ù†Ù…Ø§ÛŒÛŒØ¯ </div>


                  </div> "; */
                /* $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>Ø§Ø² 15 ØªØ§ 17 Ø¢Ø°Ø± Ù‡Ø± Ú†ÛŒØ²ÛŒ ØªÙˆ Ø¢ÛŒÙˆ Ø¨Ø®ÙˆØ§ÛŒ Ø±Ø§ÛŒÚ¯Ø§Ù†Ù‡! ØªØ±Ø§ÙÛŒÚ© Ù‡Ù… Ø±Ø§ÛŒÚ¯Ø§Ù†Ù‡!...Ù¾Ø³ Ù…ÛŒ Ø§Ø±Ø²Ù‡ Ø¨ÛŒ Ø®ÙˆØ§Ø¨ÛŒ Ø¨Ú©Ø´ÛŒ Ùˆ Ø¢Ø´ÙˆØ¨ØŒ Ø¹Ø§Ù„ÛŒØ¬Ù†Ø§Ø¨ØŒ Ø³Ø±Ú¯Ø°Ø´Øª Ù†Ø¯ÛŒÙ…Ù‡ Ùˆ Ù‡Ø²Ø§Ø±Ø§Ù† ÙÛŒÙ„Ù… Ùˆ Ø³Ø±ÛŒØ§Ù„ Ø¬Ø°Ø§Ø¨ Ø±ÙˆØ² Ø§ÛŒØ±Ø§Ù†ÛŒ Ùˆ Ø®Ø§Ø±Ø¬ÛŒ Ø±Ùˆ Ø±Ø§ÛŒÚ¯Ø§Ù† Ø§Ø² Ø¢ÛŒÙˆ Ø¨Ø¨ÛŒÙ†ÛŒ!</div>


                  </div> "; */

                break;
            case 183:
                /*
                  $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> ØªÙ…Ø§Ø´Ø§ÛŒ Ø¬Ø¯ÛŒØ¯ØªØ±ÛŒÙ† Ù‚Ø³Ù…Øª Ø§Ø² ÙØµÙ„ Ø³ÙˆÙ… Ø³Ø±ÛŒØ§Ù„ Ø´Ù‡Ø±Ø²Ø§Ø¯ Ø§Ø² ØªÙ„ÙˆÛŒØ²ÛŒÙˆÙ† Ù‡ÙˆØ´Ù…Ù†Ø¯ Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯
                  </div>


                  </div> ";

                  break; */
                /*    $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                  </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>
                  Ø¬Ø¯ÛŒØ¯ØªØ±ÛŒÙ† Ù‚Ø³Ù…Øª ÙØµÙ„ Ø³ÙˆÙ… Ø³Ø±ÛŒØ§Ù„ Ø´Ù‡Ø±Ø²Ø§Ø¯ Ø±Ùˆ Ø¨Ø§ Ø§ÛŒÙ†ØªØ±Ù†Øª Ø±Ø§ÛŒÚ¯Ø§Ù† Ø§Ø² Ø¢ÛŒÙˆ Ø¨Ø¨ÛŒÙ†
                  </div>


                  </div> "; */

                break;

            /*   default:
              $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
              <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


              </div>

              <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:62px;font-family: BYekan;'>Ù„Ø·ÙØ§ ID Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… Ø®ÙˆØ¯ Ø±Ø§ Ø¯Ø± ØªÙ…Ø§Ø³ Ø¨Ø§ Ù…Ø§ Ø§Ø±Ø³Ø§Ù„ Ù†Ù…Ø§ÛŒÛŒØ¯.Ø¯Ø± ØµÙˆØ±Øª Ø§Ø±Ø³Ø§Ù„ Ù¾ÛŒØ§Ù… Ø¯Ø± Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ù„Ø§ÛŒÙˆ Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… 5000 Ø§Ù…ØªÛŒØ§Ø² Ø¬Ø§ÛŒØ²Ù‡ Ø¯Ø§Ø¯Ù‡ Ø®ÙˆØ§Ù‡Ø¯ Ø´Ø¯</div>
              </div>";


              break;

              default:
              $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
              <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


              </div>

              <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:62px;font-family: BYekan;'>Ù„Ø·ÙØ§ ID Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… Ø®ÙˆØ¯ Ø±Ø§ Ø¯Ø± ØªÙ…Ø§Ø³ Ø¨Ø§ Ù…Ø§ Ø§Ø±Ø³Ø§Ù„ Ù†Ù…Ø§ÛŒÛŒØ¯.Ø¯Ø± ØµÙˆØ±Øª Ø§Ø±Ø³Ø§Ù„ Ù¾ÛŒØ§Ù… Ø¯Ø± Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ù„Ø§ÛŒÙˆ Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… 5000 Ø§Ù…ØªÛŒØ§Ø² Ø¬Ø§ÛŒØ²Ù‡ Ø¯Ø§Ø¯Ù‡ Ø®ÙˆØ§Ù‡Ø¯ Ø´Ø¯</div>
              </div>";


              break; */
        }
        /* if($appID != 183){
          $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
          <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> Ø³Ø§Ø¹Øª 30 :15 Ø¯Ù‚ÛŒÙ‚Ù‡ Ø§Ù…Ø±ÙˆØ² Ø§Ø² Ø´Ø¨Ú©Ù‡ Ø³Ù‡ Ø³ÛŒÙ…Ø§ Ù‡Ù…Ø²Ù…Ø§Ù† Ø¨Ø§ Ù¾Ø®Ø´ Ù…Ø³Ø§Ø¨Ù‚Ù‡ ÙÙˆØªØ¨Ø§Ù„ Ø§Ù„Ú©Ù„Ø§Ø³ÛŒÚ©Ùˆ ( Ø¨Ø§Ø²ÛŒ Ø±Ø¦Ø§Ù„ Ùˆ Ø¨Ø§Ø±Ø³Ù„ÙˆÙ†Ø§) Ø¯Ø± Ø¨Ø®Ø´ Ú†Øª  Ù‡Ù…Ø±Ø§Ù‡ Ù…Ø§ Ø¨Ø§Ø´ÛŒØ¯. </div>


          </div> ";

          } */
        /* $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:9999999999;'>
          <div style='font-size:24px;color:#000;z-index:9999999999;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:9999999999;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'> Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ø¯ÙˆØ±Ù‡ ÛŒ Ø´Ø´Ù… Ù‡Ù… Ø³Ø§Ù… Ø§Ù…Ø±ÙˆØ² Ø³ÙˆÙ… Ø¢Ø¨Ø§Ù† Ø³Ø§Ø¹Øª 19 Ø¨Ù‡ ØµÙˆØ±Øª Ø²Ù†Ø¯Ù‡ Ø¯Ø± Ù„Ø§ÛŒÙˆ Ø§ÛŒÙ†Ø³ØªØ§Ú¯Ø±Ø§Ù… samserviceofficial@  Ùˆ  samsungir@ Ø¨Ø±Ú¯Ø²Ø§Ø± Ù…ÛŒ Ø´ÙˆØ¯. ØªÙ†Ù‡Ø§ Ú©Ø§Ø±Ø¨Ø±Ø§Ù†ÛŒ Ú©Ù‡ Ø§Ù‚Ø¯Ø§Ù… Ø¨Ù‡ ØªÚ©Ù…ÛŒÙ„ Ù¾Ø±ÙˆÙØ§ÛŒÙ„ Ú©Ø±Ø¯Ù‡ Ø¨Ø§Ø´Ù†Ø¯ Ø¯Ø± Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ø´Ø±Ú©Øª Ø¯Ø§Ø¯Ù‡ Ù…ÛŒ Ø´ÙˆÙ†Ø¯. Ù¾Ø±ÙˆÙØ§ÛŒÙ„ Ø®ÙˆØ¯ Ø±Ø§ ØªÚ©Ù…ÛŒÙ„ Ù†Ù…Ø§ÛŒÛŒØ¯.  </div>
          </div>";
          $this->view2 = ""; */

        /*  if ($appID != 1 && $appID != 183) {
          $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
          <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'> Ø§Ù…ØªÛŒØ§Ø²Øª ØªÙˆÛŒ Ù‡Ù…Ø³Ø§Ù… Ø¯Ø§Ø±Ù‡ Ù…ÛŒØ±Ù‡ Ø¨Ø§Ù„Ø§ !! Ø¨Ø±Ùˆ Ø¨Ø¨ÛŒÙ† Ø¨Ø±Ù†Ø¯Ù‡ Ù…ÛŒØ´ÛŒ ÛŒØ§ Ù†Ù‡!!
          </div>


          </div> ";
          } */
        /*  $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
          <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'>
          Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ø§Ù¾Ù„ÛŒÚ©ÛŒØ´Ù† Ù‡Ù…Ø³Ø§Ù… Ø¨Ø§ Ø¬ÙˆØ§ÛŒØ² Ú©Ø§Ø±Øª Ù‡Ø¯ÛŒÙ‡ 500 Ù‡Ø²Ø§Ø±ØªÙˆÙ…Ø§Ù†ÛŒ Ùˆ Ø¨Ù„ÛŒØ· Ø³ÛŒÙ†Ù…Ø§ØªÛŒÚ©Øª Ùˆ  Ø§Ø´ØªØ±Ø§Ú© Ø´Ø´ Ù…Ø§Ù‡Ù‡ Ø¢ÛŒÙˆ  Ø§Ù…Ø±ÙˆØ² Ø³Ø§Ø¹Øª 16 Ø¯Ø±  ØµÙØ­Ù‡ ÛŒ Ø§ÛŒÙ†Ø³ØªØ§Ú¯Ø±Ø§Ù… Ø³Ø§Ù… Ø³Ø±ÙˆÛŒØ³ Ø¨Ù‡ Ø¢Ø¯Ø±Ø³    samserviceofficial@ Ø¨Ø±Ú¯Ø²Ø§Ø± Ù…ÛŒ Ø´ÙˆØ¯.

          </div>
          </div>"; */
        /*    $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
          <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'>
          Ø§Ù¾Ù„ÛŒÚ©ÛŒØ´Ù† Ù¾ÛŒØ´ Ø¨ÛŒÙ†ÛŒ Ø§Ø² Ù‚Ø³Ù…Øª Ø§Ø³Ù…Ø§Ø±Øª Ù‡Ø§Ø¨ Ù‚Ø§Ø¨Ù„ Ù†ØµØ¨ Ø§Ø³Øª.

          </div>
          </div>"; *//*
          $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
          <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


          </div>

          <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'>
          Ù…Ø±Ø§Ø³Ù… Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ù‡Ù… Ø³Ø§Ù… Ø§Ù…Ø´Ø¨ Ø³Ø§Ø¹Øª 17 Ø¯Ø± Ù„Ø§ÛŒÙˆ Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… Ø³Ø§Ù… Ø³Ø±ÙˆÛŒØ³ samserviceofficial@
          </div>
          </div>";
         */
        if ($appID == 212) {
            $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
                  <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                 </div>

                  <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'>
Ù¾ÛŒØ´ Ø¨ÛŒÙ†ÛŒ Ø¨Ø§Ø²ÛŒ Ù‡Ø§ÛŒ Ù„ÛŒÚ¯ Ø¨Ø±ØªØ± Ø¯Ø± Ø§Ù¾Ù„ÛŒÚ©ÛŒØ´Ù† Ù¾ÛŒØ´ Ø¨ÛŒÙ†ÛŒ Ø§Ù…Ú©Ø§Ù† Ù¾Ø°ÛŒØ± Ø§Ø³Øª.
</div>
                 </div>";
        }
        /*   $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;margin:0px 10px 0px 10px;'>
                     <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


                     </div>

                     <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;'>

   Ø§Ù¾ Ù‡Ù…Ø³Ø§Ù… Ø®ÙˆØ¯ Ø±Ø§ Ø¨Ø±ÙˆØ²Ø±Ø³Ø§Ù†ÛŒ Ú©Ù†ÛŒØ¯ ØªØ§ Ø§Ø² Ø§Ù…Ú©Ø§Ù†Ø§Øª Ø¬Ø¯ÛŒØ¯Ø´ Ø¨Ù‡Ø±Ù‡ Ù…Ù†Ø¯ Ø´Ø¯Ù‡ Ùˆ Ø¨Ø±Ù†Ø¯Ù‡ ÛŒ Ø¬ÙˆØ§ÛŒØ² Ø´ÙˆÛŒØ¯
   </div>


                     </div> ";*/
        /*     $this->view2 = "<div id='ssnMsg' style='position:fixed;top:10px;right:0px;z-index:10000;'>
               <div style='font-size:24px;color:#000;z-index:10000;direction:rtl;background:#D3D3D3;border-top-left-radius:13px;border-top-right-radius:13px;padding:2px 50px 2px 50px;font-family: BYekan;padding-right:-20px !important;'> Ø³Ø§Ù…Ø³ÙˆÙ†Ú¯


               </div>

               <div  style='font-size:27px;color:#000;z-index:10000;direction:rtl;background:#808080;border-bottom-left-radius:13px;border-bottom-right-radius:13px;padding:2px 50px 2px 50px;height:100px;font-family: BYekan;'>
               Ù…Ø±Ø§Ø³Ù… Ù‚Ø±Ø¹Ù‡ Ú©Ø´ÛŒ Ù‡Ù… Ø³Ø§Ù… Ø§Ù…Ø´Ø¨ Ø³Ø§Ø¹Øª 17 Ø¯Ø± Ù„Ø§ÛŒÙˆ Ø§ÛŒÙ†Ø³ØªÚ¯Ø±Ø§Ù… Ø³Ø§Ù… Ø³Ø±ÙˆÛŒØ³ samserviceofficial@
               </div>
               </div>";
     */
        $this->post_data['view'] = $this->view2;
        echo json_encode($this->post_data);
    }

    public function timelogin($userTotallScore) {

        for ($i = 0; $i < 5; $i++) {


            if ($i * 20000 <= $userTotallScore && $userTotallScore < ($i * 20000) + 20000) {

                $this->logTime = $i + 2;
            }
        }
        if (100000 <= $userTotallScore) {
            $this->logTime = 11;
        }
    }

}
