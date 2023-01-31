export const User = {
  state: {
    detail: {},
    userLoadStatus: 0,
    modelTv: 'tizen',
    tvDetail: 16,
    isLoggedOut: '',
    isRank: 0,
    userRank: '',
    access_token: "",
    notifications: {},
    stateSplash: 1,
    currentPage: 'Seven', // safeye fe'li
    playMathInDay: 0,
    lastFilterChallengeSelected: 1


    //notifications:{"error":"false","pageEng":"","page_number":1,"tk":"6295e147666f87a41174dd71af1dfc82","is_poll":0,"user_id":"740741","unread_count":"0","friend_count":"0","request_count":"0","user_pic":null,"user_pic_status":"0","user_score":"3080","wall_list":"{\"listcat\":1,\"cat\":-1,\"status\":\"ok\",\"code\":\"196\",\"description2\":\"list of wall pm's\",\"description\":\"\\u0644\\u06cc\\u0633\\u062a \\u0646\\u0648\\u0634\\u062a\\u0647 \\u0647\\u0627\\u06cc \\u0631\\u0648\\u06cc \\u062f\\u06cc\\u0648\\u0627\\u0631\",\"wall\":[{\"wall_id\":\"90466\",\"wall_text\":\"\\u0641\\u0642\\u0637 \\u067e\\u0627\\u0628\\u062c\\u06cc\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"-1\",\"time\":\"11 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"595514\",\"user_status\":\"0\",\"user_username\":\"09122622914\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/595514-1541941828.png\",\"user_score\":\"33759\",\"is_liked\":0,\"is_reply\":1,\"reply_username\":\"1580465\",\"reply_text\":\"\\u0645\\u0646 \\u0631\\u0648\\u06cc\\u0627\\u0644\",\"reply_img\":\"\"},{\"wall_id\":\"90465\",\"wall_text\":\"\\u0627\\u0646 \\u0634\\u0627\\u0644\\u0644\\u0647 \\u0628\\u0627 \\u0627\\u06cc\\u0646 \\u0628\\u0627\\u0632\\u06cc\\u06a9\\u0646\\u0627\\u0646 \\u0627\\u0645\\u0633\\u0627\\u0644 \\u0647\\u0645 \\u0642\\u0647\\u0631\\u0645\\u0627\\u0646\\u06cc\\u0645 \\u067e\\u0631\\u0633\\u067e\\u0648\\u0644\\u06cc\\u0633 \\u0642\\u0647\\u0631\\u0645\\u0627\\u0646\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"1\",\"time\":\"25 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"450179\",\"user_status\":\"0\",\"user_username\":\"1408269\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/450179-1545776030.png\",\"user_score\":\"12213\",\"is_liked\":0,\"is_reply\":1,\"reply_username\":\"kami.z\",\"reply_text\":\"\\u06cc\\u0639\\u0642\\u0648\\u0628 \\u06a9\\u0631\\u06cc\\u0645\\u06cc \\u0628\\u0627\\u0632\\u06cc\\u06a9\\u0646 \\u062a\\u06cc\\u0645 \\u0641\\u0648\\u062a\\u0628\\u0627\\u0644 \\u0633\\u067e\\u06cc\\u062f\\u0631\\u0648\\u062f \\u06a9\\u0647 \\u0646\\u0627\\u0645\\u0634 \\u0628\\u0631\\u0627\\u06cc \\u0646\\u06cc\\u0645\\u200c\\u0641\\u0635\\u0644 \\u062f\\u0648\\u0645 \\u0647\\u062c\\u062f\\u0647\\u0645\\u06cc\\u0646 \\u062f\\u0648\\u0631\\u0647 \\u0644\\u06cc\\u06af \\u0628\\u0631\\u062a\\u0631 \\u062f\\u0631 \\u0641\\u0647\\u0631\\u0633\\u062a \\u0645\\u0648\\u0631\\u062f \\u0646\\u0638\\u0631 \\u0639\\u0644\\u06cc \\u06a9\\u0631\\u06cc\\u0645\\u06cc \\u0642\\u0631\\u0627\\u0631 \\u0646\\u062f\\u0627\\u0634\\u062a\\u060c \\u0633\\u0631\\u0627\\u0646\\u062c\\u0627\\u0645 \\u0628\\u0647 \\u0635\\u0648\\u0631\\u062a \\u0631\\u0633\\u0645\\u06cc \\u0627\\u0632 \\u0627\\u06cc\\u0646 \\u062a\\u06cc\\u0645 \\u062c\\u062f\\u0627 \\u0634\\u062f\\n\\n\",\"reply_img\":\"\"},{\"wall_id\":\"90464\",\"wall_text\":\"\\u0639\\u0644\\u06cc\\u06a9 \\u0633\\u0644\\u0627\\u0645\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"2\",\"time\":\"28 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"450179\",\"user_status\":\"0\",\"user_username\":\"1408269\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/450179-1545776030.png\",\"user_score\":\"12213\",\"is_liked\":0,\"is_reply\":1,\"reply_username\":\"Kamyar4792\",\"reply_text\":\"\\n\\u0633\\u0644\\u0627\\u0645\",\"reply_img\":\"\"},{\"wall_id\":\"90463\",\"wall_text\":\"????\\u0627\\u0645\\u0631\\u0648\\u0632 \\u067e\\u0646\\u062c\\u0645 \\u062f\\u06cc \\u0645\\u0627\\u0647 \\u067e\\u0627\\u0646\\u0632\\u062f\\u0647\\u0645\\u06cc\\u0646 \\u0633\\u0627\\u0644\\u0631\\u0648\\u0632 \\u0632\\u0644\\u0632\\u0644\\u0647 \\u0628\\u0645 \\u0627\\u0633\\u062a(\\u06f5 \\u062f\\u06cc \\u06f1\\u06f3\\u06f8\\u06f2). \\u0631\\u0648\\u0632\\u06cc \\u06a9\\u0647 \\u0632\\u0645\\u06cc\\u0646 \\u0644\\u0631\\u0632\\u06cc\\u062f \\u0648 \\u0642\\u0644\\u0628 \\u0632\\u0645\\u0627\\u0646 \\u0627\\u0632 \\u062d\\u0631\\u06a9\\u062a \\u0627\\u06cc\\u0633\\u062a\\u0627\\u062f...\\n\\n????\\u062f\\u0631 \\u0632\\u0645\\u06cc\\u0646 \\u0644\\u0631\\u0632\\u0647\\u200c\\u0627\\u06cc \\u067e\\u0631 \\u0642\\u062f\\u0631\\u062a \\u062f\\u0631 \\u0627\\u06cc\\u0646 \\u0634\\u0647\\u0631\\u060c \\u062f\\u0631 \\u0686\\u0646\\u06cc\\u0646 \\u0631\\u0648\\u0632\\u06cc\\u060c \\u0628\\u06cc\\u0634 \\u0627\\u0632 \\u0686\\u0647\\u0644 \\u0647\\u0632\\u0627\\u0631 \\u0646\\u0641\\u0631 \\u062c\\u0627\\u0646 \\u062e\\u0648\\u062f \\u0631\\u0627 \\u0627\\u0632 \\u062f\\u0633\\u062a \\u062f\\u0627\\u062f\\u0646\\u062f \\u0648 \\u062a\\u0642\\u0631\\u06cc\\u0628\\u0627 \\u062a\\u0645\\u0627\\u0645\\u06cc \\u0627\\u06cc\\u0646 \\u0634\\u0647\\u0631 \\u0627\\u0632 \\u062c\\u0645\\u0644\\u0647 \\u0627\\u0631\\u06af \\u0645\\u0639\\u0631\\u0648\\u0641 \\u0628\\u0645\\u060c \\u0628\\u0647 \\u0637\\u0648\\u0631 \\u06a9\\u0644\\u06cc \\u0648\\u06cc\\u0631\\u0627\\u0646 \\u0634\\u062f.\\n\\n????\\u06cc\\u0627\\u062f \\u0648 \\u062e\\u0627\\u0637\\u0631\\u0647 \\u062f\\u0631\\u06af\\u0630\\u0634\\u062a\\u06af\\u0627\\u0646 \\u0627\\u06cc\\u0646 \\u0632\\u0644\\u0632\\u0644\\u0647 \\u06af\\u0631\\u0627\\u0645\\u06cc \\u0628\\u0627\\u062f????\\n\\n\\u200c\\u200e\\u200c\\u200e\\u200c\\u200e\\u200c\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"0\",\"time\":\"49 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90462\",\"wall_text\":\"\\u0622\\u0626\\u064a\\u0646 \\u062e\\u0648\\u0628 \\u0632\\u06cc\\u0633\\u062a\\u0646\\n\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u062f\\u0639\\u0627\\u06a9\\u0631\\u062f\\u0646\\u060c\\u0627\\u06cc\\u0645\\u0627\\u0646 \\u062f\\u0627\\u0634\\u062a\\u0647 \\u0628\\u0627\\u0634\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u0635\\u062d\\u0628\\u062a \\u06a9\\u0631\\u062f\\u0646\\u060c\\u06af\\u0648\\u0634 \\u06a9\\u0646\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u062e\\u0631\\u062c \\u06a9\\u0631\\u062f\\u0646\\u060c\\u0628\\u062f\\u0633\\u062a \\u0622\\u0631\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u0646\\u0648\\u0634\\u062a\\u0646\\u060c\\u0641\\u06a9\\u0631\\u06a9\\u0646\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u062a\\u0633\\u0644\\u06cc\\u0645 \\u0634\\u062f\\u0646\\u060c\\u062a\\u0644\\u0627\\u0634 \\u06a9\\u0646\\n\\u0642\\u0628\\u0644 \\u0627\\u0632\\u0645\\u0631\\u062f\\u0646\\u060c\\u0632\\u0646\\u062f\\u06af\\u06cc \\u06a9\\u0646\\n\\n\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"0\",\"time\":\"49 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90457\",\"wall_text\":\"\\u0628\\u0627 \\u06a9\\u0645\\u06a9 \\u06cc\\u06a9 \\u0647\\u0648\\u0627\\u062f\\u0627\\u0631\\u060c 30 \\u0647\\u0632\\u0627\\u0631 \\u062f\\u0644\\u0627\\u0631 \\u0627\\u0632 \\u0637\\u0644\\u0628 \\u062c\\u067e\\u0627\\u0631\\u0648\\u0641 \\u067e\\u0631\\u062f\\u0627\\u062e\\u062a \\u0634\\u062f \\u062a\\u0627 \\u0634\\u0631\\u0627\\u06cc\\u0637 \\u0628\\u0631\\u0627\\u06cc \\u0628\\u0627\\u0632\\u06af\\u0634\\u062a \\u0627\\u06cc\\u0646 \\u0628\\u0627\\u0632\\u06cc\\u06a9\\u0646 \\u0628\\u0647 \\u0627\\u0633\\u062a\\u0642\\u0644\\u0627\\u0644 \\u0641\\u0631\\u0627\\u0647\\u0645 \\u0634\\u0648\\u062f\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"1\",\"time\":\"52 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90455\",\"wall_text\":\"\\u0645\\u062d\\u0645\\u062f \\u062f\\u0627\\u0646\\u0634\\u06af\\u0631: \\u0627\\u0632 \\u067e\\u0631\\u0633\\u067e\\u0648\\u0644\\u06cc\\u0633 \\u067e\\u06cc\\u0634\\u0646\\u0647\\u0627\\u062f \\u062f\\u0627\\u0634\\u062a\\u0645 \\u0627\\u0645\\u0627 \\u06a9\\u0644 \\u062e\\u0627\\u0646\\u062f\\u0627\\u0646\\u0645 \\u0627\\u0633\\u062a\\u0642\\u0644\\u0627\\u0644\\u06cc \\u0647\\u0633\\u062a\\u0646\\u062f\\u061b \\u0641\\u0648\\u062a\\u0628\\u0627\\u0644\\u00a0\\u0645\\u0627 \\u0632\\u06cc\\u0627\\u062f\\u06cc \\u062f\\u0631 \\u0627\\u06cc\\u0646\\u0633\\u062a\\u0627\\u06af\\u0631\\u0627\\u0645 \\u0627\\u0633\\u062a\\n\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"1\",\"time\":\"53 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90453\",\"wall_text\":\"\\u062f\\u0631 \\u062f\\u0627\\u06cc\\u0631\\u0629\\u200c\\u0627\\u0644\\u0645\\u0639\\u0627\\u0631\\u0641 \\u0628\\u0631\\u06cc\\u062a\\u0627\\u0646\\u06cc\\u06a9\\u0627 \\u0628\\u0647 \\u200f\\u0627\\u0646\\u06af\\u0644\\u06cc\\u0633\\u06cc\\u200f \\u0622\\u0645\\u062f\\u0647 \\u0627\\u0633\\u062a:\\u200f \\u00ab\\u200f\\u067e\\u0631\\u0633\\u062a\\u0634 \\u062f\\u0631\\u062e\\u062a \\u00ab\\u06a9\\u0627\\u062c\\u00bb \\u06cc\\u0627 \\u062f\\u0631\\u062e\\u062a \\u00ab\\u0647\\u0645\\u06cc\\u0634\\u0647 \\u0633\\u0628\\u0632\\u00bb \\u06a9\\u0647 \\u062f\\u0631 \\u0645\\u06cc\\u0627\\u0646 \\u0627\\u0631\\u0648\\u067e\\u0627\\u06cc\\u06cc \\u0647\\u0627\\u06cc \\u0650  \\u00ab\\u0645\\u0647\\u0631\\u067e\\u0631\\u0633\\u062a\\u00bb \\u0631\\u0627\\u06cc\\u062c \\u0628\\u0648\\u062f\\u060c\\u200f \\u062d\\u062a\\u06cc \\u067e\\u0633 \\u0627\\u0632 \\u0645\\u0633\\u06cc\\u062d\\u06cc \\u0634\\u062f\\u0646\\u0634\\u0627\\u0646 \\u0646\\u06cc\\u0632 \\u0627\\u062f\\u0627\\u0645\\u0647 \\u06cc\\u0627\\u0641\\u062a.\\u200c\\u200f\\u00bb  \\u0645\\u0633\\u06cc\\u062d\\u06cc\\u0627\\u0646 \\u0628\\u0627 \\u062a\\u0642\\u0644\\u06cc\\u062f \\u0627\\u0632 \\u0627\\u06cc\\u0631\\u0627\\u0646\\u06cc\\u0627\\u0646 \\u0648 \\u0628\\u0627 \\u200f\\u06af\\u0630\\u0627\\u0634\\u062a\\u0646 \\u062f\\u0631\\u062e\\u062a\\u0650 \\u06a9\\u0631\\u06cc\\u0633\\u0645\\u0633 \\u0647\\u0646\\u06af\\u0627\\u0645 \\u0650 \\u0627\\u0639\\u06cc\\u0627\\u062f \\u0632\\u0645\\u0633\\u062a\\u0627\\u0646\\u06cc \\u062f\\u0631 \\u0648\\u0631\\u0648\\u062f\\u06cc \\u0650 \\u062e\\u0627\\u0646\\u0647 \\u0631\\u0633\\u0645\\u0650 \\n\\u067e\\u0631\\u0633\\u062a\\u0634 \\u062f\\u0631\\u062e\\u062a \\u0631\\u0627 \\u0645\\u0627\\u0646\\u062f\\u06af\\u0627\\u0631 \\u06a9\\u0631\\u062f\\u0646\\u062f!\\n\\n\\u0631\\u0647\\u0628\\u0631\\u0627\\u0646 \\u06a9\\u0644\\u06cc\\u0633\\u0627 \\u0628\\u0627 \\u0627\\u06cc\\u0646 \\u062a\\u0642\\u0644\\u06cc\\u062f\\u200c\\u0647\\u0627 \\u0645\\u06cc\\u200c\\u062e\\u0648\\u0627\\u0633\\u062a\\u0646\\u062f \\u0645\\u0633\\u06cc\\u062d\\u06cc\\u062a \\u0631\\u0627 \\u0628\\u0631\\u0627\\u06cc \\u0645\\u0647\\u0631\\u067e\\u0631\\u0633\\u062a\\u0627\\u0646\\u06cc \\u06a9\\u0647 \\u0628\\u0647 \\u0627\\u06cc\\u0646 \\u062f\\u06cc\\u0646 \\u0645\\u06cc\\u200c\\u06af\\u0631\\u0648\\u06cc\\u062f\\u0646\\u062f\\u060c\\u200f \\u062c\\u0630\\u0627\\u0628\\u200c\\u062a\\u0631 \\u0633\\u0627\\u0632\\u0646\\u062f! \\n\\n\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"0\",\"time\":\"54 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90452\",\"wall_text\":\"\\u0628\\u0639\\u062f \\u0627\\u0632 \\u0641\\u0631\\u0648\\u067e\\u0627\\u0634\\u06cc \\u0627\\u0645\\u067e\\u0631\\u0627\\u062a\\u0648\\u0631\\u06cc\\u200c\\u0647\\u0627\\u06cc \\u0627\\u06cc\\u0631\\u0627\\u0646 \\u0628\\u0627\\u0633\\u062a\\u0627\\u0646\\u060c \\u0633\\u0644\\u0633\\u0644\\u0647\\u200c\\u06cc \\u00ab\\u0633\\u0644\\u062c\\u0648\\u0642\\u06cc\\u00bb \\u0627\\u0648\\u0644\\u06cc\\u0646 \\u0633\\u0644\\u0633\\u0644\\u0647\\u200c\\u06cc \\u0628\\u0627\\u0634\\u06a9\\u0648\\u0647\\u06cc\\u200c\\u0633\\u062a \\u06a9\\u0647 \\u0627\\u0632 \\u0646\\u0638\\u0631 \\u0641\\u0631\\u0647\\u0646\\u06af \\u0648 \\u062a\\u0645\\u062f\\u0646 \\u0648 \\u0647\\u0645\\u0686\\u0646\\u06cc\\u0646 \\u062f\\u0631\\u06a9\\u0650 \\u0627\\u0645\\u067e\\u0631\\u0627\\u062a\\u0648\\u0631\\u06cc\\u060c \\u062e\\u0635\\u0644\\u062a\\u06cc \\u0627\\u06cc\\u0631\\u0627\\u0646\\u06cc \\u062f\\u0627\\u0631\\u062f. \\n\\u0646\\u0648\\u0627\\u062f\\u06af\\u0627\\u0646 \\u0650 \\u0647\\u0645\\u06cc\\u0646 \\u0642\\u0628\\u0627\\u06cc\\u0644 \\u062a\\u0631\\u06a9 \\u0633\\u0644\\u062c\\u0648\\u0642\\u06cc \\u0628\\u0648\\u062f\\u0646\\u062f \\u06a9\\u0647 \\u0628\\u0647\\u200c\\u062a\\u062f\\u0631\\u06cc\\u062c \\u062f\\u0631 \\u0627\\u06cc\\u0631\\u0627\\u0646 \\u0633\\u0644\\u0633\\u0644\\u0647 \\u0647\\u0627\\u06cc \\u0635\\u0641\\u0648\\u06cc \\u0648 \\u0627\\u0641\\u0634\\u0627\\u0631\\u06cc\\u0627\\u0646 \\u0648 \\u0642\\u0627\\u062c\\u0627\\u0631\\u06cc\\u0627\\u0646 \\u0648 \\u062f\\u0631 \\u062a\\u0631\\u06a9\\u06cc\\u0647 \\u0633\\u0644\\u0633\\u0644\\u0647 \\u0639\\u062b\\u0645\\u0627\\u0646\\u06cc \\u0631\\u0627 \\u0627\\u06cc\\u062c\\u0627\\u062f \\u06a9\\u0631\\u062f\\u0646\\u062f \\u0648 \\u0645\\u064f\\u0647\\u0631 \\u062e\\u0648\\u062f \\u0631\\u0627 \\u0628\\u0631 \\u0645\\u0644\\u06cc\\u062a \\u0648 \\u0642\\u0648\\u0645\\u06cc\\u062a \\u0650 \\u06a9\\u0646\\u0648\\u0646\\u06cc \\u062f\\u0648 \\u06a9\\u0634\\u0648\\u0631\\u06cc \\u0632\\u062f\\u0646\\u062f \\u06a9\\u0647 \\u0627\\u0645\\u0631\\u0648\\u0632\\u0647 \\u00ab\\u0627\\u06cc\\u0631\\u0627\\u0646\\u00bb \\u0648 \\u00ab\\u062a\\u0631\\u06a9\\u06cc\\u0647\\u00bb \\u0645\\u06cc\\u0646\\u0627\\u0645\\u06cc\\u0645!\\n\\n\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"0\",\"time\":\"54 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90449\",\"wall_text\":\"????\\u0648\\u0631\\u0632\\u0634\\u06a9\\u0627\\u0631\\u0627\\u0646\\u06cc \\u06a9\\u0647 \\u067e\\u0633 \\u0627\\u0632 \\u06a9\\u0646\\u0627\\u0631 \\u06af\\u0630\\u0627\\u0634\\u062a\\u0646 \\u0648\\u0631\\u0632\\u0634\\u060c \\u0633\\u0648\\u067e\\u0631\\u0627\\u0633\\u062a\\u0627\\u0631 \\u0633\\u06cc\\u0646\\u0645\\u0627 \\u0634\\u062f\\u0646\\u062f\\n\\n????\\u0627\\u0632 \\u062f\\u0648\\u0627\\u06cc\\u0646 \\u062c\\u0627\\u0646\\u0633\\u0648\\u0646 \\u06a9\\u0647 \\u0639\\u0636\\u0644\\u0647\\u200c\\u0647\\u0627\\u06cc \\u0633\\u062a\\u0628\\u0631 \\u0627\\u0648\\u060c \\u0642\\u062f\\u0631\\u062a \\u062e\\u062f\\u0627\\u06cc\\u0627\\u0646 \\u06cc\\u0648\\u0646\\u0627\\u0646\\u06cc \\u0631\\u0627 \\u062f\\u0631 \\u0630\\u0647\\u0646 \\u062a\\u062f\\u0627\\u0639\\u06cc \\u0645\\u06cc\\u200c\\u06a9\\u0646\\u062f\\u060c \\u062a\\u0627 \\u062c\\u06cc\\u0633\\u0648\\u0646\\u200c\\u0644\\u06cc????\\n\",\"wall_image\":\"ssn\\\/images\\\/wall\\\/636576-1545811941.png\",\"wall_link\":\"ssn\\\/images\\\/wallDef\\\/636576-1545811941.png\",\"like_Count\":\"0\",\"wall_cat\":\"8\",\"time\":\"56 \\u062f\\u0642\\u06cc\\u0642\\u0647 \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0},{\"wall_id\":\"90446\",\"wall_text\":\"\\u0642\\u0637\\u0627\\u0631 \\u0628\\u0627\\u0631\\u06cc \\u0633\\u0646\\u06af\\u06cc\\u0646 \\u062f\\u0631 \\u0645\\u062d\\u0648\\u0631 \\u0633\\u0627\\u0631\\u06cc \\u062f\\u0686\\u0627\\u0631 \\u062d\\u0631\\u06cc\\u0642 \\u0634\\u062f\\n\\n????\\u0642\\u0637\\u0627\\u0631 \\u0628\\u0627\\u0631\\u06cc \\u0633\\u0646\\u06af\\u06cc\\u0646 \\u062f\\u0631 \\u0645\\u062d\\u062f\\u0648\\u062f\\u0647 \\u067e\\u0644 \\u0630\\u063a\\u0627\\u0644\\u200c\\u0686\\u0627\\u0644 \\u0633\\u0627\\u0631\\u06cc \\u062f\\u0686\\u0627\\u0631 \\u062d\\u0631\\u06cc\\u0642 \\u0634\\u062f \\u0648 \\u0646\\u06cc\\u0631\\u0648\\u06cc\\u200c\\u0647\\u0627\\u06cc \\u0633\\u0647 \\u0627\\u06cc\\u0633\\u062a\\u06af\\u0627\\u0647 \\u0622\\u062a\\u0634\\u200c\\u0646\\u0634\\u0627\\u0646\\u06cc \\u0628\\u0647 \\u0645\\u062d\\u0644 \\u062d\\u0627\\u062f\\u062b\\u0647 \\u0627\\u0639\\u0632\\u0627\\u0645 \\u0634\\u062f\\u0646\\u062f. \\n????\\u0645\\u062f\\u06cc\\u0631\\u06a9\\u0644 \\u0631\\u0627\\u0647\\u200c\\u0622\\u0647\\u0646 \\u0634\\u0645\\u0627\\u0644:\\u0622\\u062a\\u0634\\u200c\\u0633\\u0648\\u0632\\u06cc \\u06cc\\u0627 \\u0633\\u0627\\u0646\\u062d\\u0647 \\u0648 \\u06cc\\u0627 \\u0628\\u0631\\u062e\\u0648\\u0631\\u062f \\u0648 \\u0645\\u0633\\u0627\\u0626\\u0644 \\u0627\\u06cc\\u0646 \\u0686\\u0646\\u06cc\\u0646\\u06cc \\u0646\\u0628\\u0648\\u062f\\u0647 \\u0628\\u0644\\u06a9\\u0647 \\u0627\\u06cc\\u0646 \\u062d\\u0627\\u062f\\u062b\\u0647 \\u0628\\u0647\\u200c\\u062f\\u0644\\u06cc\\u0644 \\u062c\\u0631\\u0642\\u0647\\u200c\\u0647\\u0627\\u06cc\\u06cc \\u0627\\u0633\\u062a \\u06a9\\u0647 \\u062f\\u0631 \\u062f\\u0627\\u062e\\u0644 \\u062f\\u06cc\\u0632\\u0644 \\u0627\\u062a\\u0641\\u0627\\u0642 \\u0645\\u06cc\\u200c\\u0627\\u0641\\u062a\\u062f\\\/\\u062f\\u0631 \\u062d\\u0627\\u0644 \\u062d\\u0627\\u0636\\u0631 \\u0627\\u06cc\\u0646 \\u0642\\u0637\\u0627\\u0631 \\u0628\\u0647 \\u0645\\u0642\\u0635\\u062f \\u0633\\u0627\\u0631\\u06cc \\u062f\\u0631 \\u062d\\u0627\\u0644 \\u062d\\u0631\\u06a9\\u062a \\u0627\\u0633\\u062a \\u0648 \\u0645\\u0634\\u06a9\\u0644\\u06cc \\u062f\\u0631 \\u0627\\u06cc\\u0646 \\u0632\\u0645\\u06cc\\u0646\\u0647 \\u0648\\u062c\\u0648\\u062f \\u0646\\u062f\\u0627\\u0631\\u062f.\",\"wall_image\":\"\",\"wall_link\":\"\",\"like_Count\":\"0\",\"wall_cat\":\"0\",\"time\":\"1 \\u0633\\u0627\\u0639\\u062a \\u0642\\u0628\\u0644  \",\"user_id\":\"636576\",\"user_status\":\"0\",\"user_username\":\"kami.z\",\"user_pic\":\"ssn\\\/images\\\/avatar\\\/636576-1543044916.png\",\"user_score\":\"30968\",\"is_liked\":0,\"is_reply\":0}],\"wall_Type\":0,\"counter\":\"0\",\"category\":[{\"cat_id\":\"-1\",\"cat_persion\":\"\\u0647\\u0645\\u0647\",\"cat_english\":\"all\"},{\"cat_id\":\"0\",\"cat_persion\":\"\\u0639\\u0645\\u0648\\u0645\\u06cc\",\"cat_english\":\"general\"},{\"cat_id\":\"1\",\"cat_persion\":\"\\u0648\\u0631\\u0632\\u0634\\u06cc\",\"cat_english\":\"sports\"},{\"cat_id\":\"2\",\"cat_persion\":\"\\u0633\\u0631\\u06af\\u0631\\u0645\\u06cc\",\"cat_english\":\"fun\"},{\"cat_id\":\"5\",\"cat_persion\":\"\\u067e\\u06cc\\u0634\\u0646\\u0647\\u0627\\u062f\\u0627\\u062a\",\"cat_english\":\"artistic\"},{\"cat_id\":\"8\",\"cat_persion\":\"\\u06af\\u0627\\u0644\\u0631\\u06cc\",\"cat_english\":\"photography\"},{\"cat_id\":\"9\",\"cat_persion\":\"\\u0627\\u062e\\u0628\\u0627\\u0631 \\u0647\\u0645 \\u0633\\u0627\\u0645\",\"cat_english\":\"hamsam news\"},{\"cat_id\":\"10\",\"cat_persion\":\"\\u0634\\u0647\\u0631\\u0632\\u0627\\u062f\",\"cat_english\":\"shahrzad\"}]}","view":"<div id='ssnMsg' style='width: 1920px;height: 1080px;position:absolute;right: 0px;top: 0px;z-index:99999999999;'>\r\n    <div style='background: black;opacity: 0.7;width: 1920px;height: 1080px;right: 0px;top: 0px;;position: fixed;'>\r\n\r\n    <\/div>\r\n    <div id='pnotif-1' style='top:353px;right:608px;position: fixed;overflow: hidden;background: #ebebeb;border-radius: 7px;width: 648px;min-height: 172px' class='push-notif' num='1'>\r\n\r\n        <div style='width: 100%;height: 60px;background: #337ab7;position: absolute;top: 0px;'>\r\n            <img src='http:\/\/ssn.tvapps.ir\/alt2\/ssn\/images\/version\/hamsam.png' style='margin-right: 20px; margin-top:7px;height: 43px;float: right;position: relative '>\r\n            <div style='float: right;height: 60px;line-height: 64px;direction: rtl ;text-align: right;color:#ccdeed;margin-right: 10px;font-size: 11px;font-weight: bold'>\r\n                \u0627\u067e\u0644\u06cc\u06a9\u06cc\u0634\u0646 \u06a9\u0627\u0631\u0628\u0631\u0627\u0646 \u062a\u0644\u0648\u06cc\u0632\u06cc\u0648\u0646 \u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f \u0633\u0627\u0645\u0633\u0648\u0646\u06af\r\n            <\/div>\r\n        <\/div>\r\n        <img src='http:\/\/ssn.tvapps.ir\/alt3\/ssn\/images\/apps\/SSN\/ssn\/telegram-insta.png' style='z-index: 10000;position: absolute;width: 120px;top: 35px;left: 30px;'>\r\n        <div  style='text-align: right;font-size: 19px;color: #000;z-index: 10000;direction: rtl;font-family: BYekan;position: relative;margin-top: 80px;max-width: 470px;margin-right: 21px;float: right;'>\r\n            \u0645\u0627 \u0631\u0627 \u062f\u0631 \u062a\u0644\u06af\u0631\u0627\u0645 \u0648 \u0627\u06cc\u0646\u0633\u062a\u0627\u06af\u0631\u0627\u0645 \u0628\u0647 \u0622\u062f\u0631\u0633 hamsamtv@ \u062f\u0646\u0628\u0627\u0644 \u06a9\u0646\u06cc\u062f.          \r\n        <\/div>\r\n    <\/div>\r\n<\/div>"}
    ,
  },
  getters: {

    getFilteredChallenge(state){
      return state.lastFilterChallengeSelected;
    },

    getUserLoadStatus(state) {
      return state.userLoadStatus;
    },

    getUser(state) {
      return state.detail;
    },
    getModelTv(state) {
      return state.modelTv;
    }, getTvDetail(state) {
      return state.tvDetail;
    },
    getIsRank(state) {
      return state.isRank;
    },
    getUserRank(state) {
      return state.userRank;
    }
    , access_token(state) {

      return state.access_token;
    }, getStateSpalsh(state) {
      return state.stateSplash;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
    getPlayMathInDay(state) {
      return state.playMathInDay;
    }

  },
  actions: {
    loadUser({commit}) {
      commit('setUserLoadStatus', 1);

      UserApi.getUser()
        .then(function (response) {
          commit('setUser', response.data);
          commit('setUserLoadStatus', 2);
        })
        .catch(function () {
          commit('setUser', []);
          commit('setUserLoadStatus', 3);
        });
    },
    setUrl({commit}) {
      commit('setUrl');
    }
  },
  mutations: {

    setFilteredChallenge(state, filterNumber) {
      state.lastFilterChallengeSelected = filterNumber;
    },

    setUserRank(state, rank) {
      state.userRank = rank;
    },
    setUserLoadStatus(state, status) {
      state.userLoadStatus = status;
    },

    setUser(state, user) {
      state.detail = user;
    },
    setUrl() {
      //console.log('dispatch')
      ROAST_CONFIG.API_URL = 'asasascascasca';
    },
    setUserTv(state, payload) {
      state.tvDetail = payload;

    }, setAccesToken(state, access_token) {
      state.access_token = access_token;

    }, setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;

    }, hideSplash(state) {
    //  console.log("state hideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      state.stateSplash = 0;
    },

    updateDetail(state, payload) {
      state.detail[payload["item"]] = parseInt(state.detail[payload["item"]]) + parseInt(payload["amount"]);
    },
    updateUserName(state, payload) {
      state.detail[payload["item"]] = payload["amount"];
    },
    setPlayMathInDay(state) {
      state.playMathInDay = 1;
    }


  },
};
