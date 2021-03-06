-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.25 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 attendance 的数据库结构
CREATE DATABASE IF NOT EXISTS `attendance` /*!40100 DEFAULT CHARACTER SET gbk */;
USE `attendance`;


-- 导出  表 attendance.course 结构
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `course_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '课程编号',
  `course_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '课程名称',
  `tea_name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '任课老师',
  `course_class` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '上课班级',
  `course_major` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '所属专业',
  `course_department` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '所属学院',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.course 的数据：~10 rows (大约)
DELETE FROM `course`;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`id`, `course_ID`, `course_name`, `tea_name`, `course_class`, `course_major`, `course_department`) VALUES
	(3, '13', '爸爸', '英语', '软件四班，2308', '软件工程', '信息工程'),
	(4, '20190202131443306', '编译原理', '阳泉', '1807,1503,1708,', '软件工程', '信息工程学院'),
	(6, '20190202131732529', 'java', '车鹏飞', '2709,8901,8903，', '历史学', '人文学院'),
	(7, '20190202150218291', 'html', '任红', '2309,6708,1208', '生物工程', '生物学院'),
	(8, '20190208141911198', '数学1', '苏靖', '软件3班，软件2班', '软件工程', '信息工程学院'),
	(9, '20190208142010245', '数学2', '苏靖', '计算机科学与技术1，计算机科学与技术2，软件3班，软件2班', '软件工程', '信息工程学院'),
	(10, '20190208142710835', '英语', '小臭臭', '软件三班，软件四班', '软件工程', '信息工程学院'),
	(11, '20190208144912424', '数学', '小臭臭', '软件三班，软件四班', '软件工程', '信息工程学院'),
	(12, '20190211203553600', 'Java EE 开发', '阿华', '软件三班，软件四班', '软件工程', '信息工程学院'),
	(13, '20190211203657596', 'Web开发', '阿华', '软件三班，计算机技术与科学一班', '软件工程', '信息工程学院');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;


-- 导出  表 attendance.course_arrangement 结构
CREATE TABLE IF NOT EXISTS `course_arrangement` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `carm_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '课程安排编号',
  `course_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '课程编号',
  `course_name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '课程名字',
  `course_week` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '上课时间',
  `start_time` varchar(255) CHARACTER SET utf8 NOT NULL,
  `end_time` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COMMENT='课程安排表';

-- 正在导出表  attendance.course_arrangement 的数据：~5 rows (大约)
DELETE FROM `course_arrangement`;
/*!40000 ALTER TABLE `course_arrangement` DISABLE KEYS */;
INSERT INTO `course_arrangement` (`id`, `carm_ID`, `course_ID`, `course_name`, `course_week`, `start_time`, `end_time`) VALUES
	(11, '1553778317000', '20190202131443306', '编译原理', '星期一', '0800', '0950'),
	(12, '1553778336000', '20190202131732529', 'java', '星期一', '0800', '0950'),
	(13, '1553778345000', '20190202150218291', 'html', '星期一', '0800', '0950'),
	(14, '1553778356000', '20190211203553600', 'Java EE 开发', '星期一', '0800', '0950'),
	(15, '1553778367000', '20190211203657596', 'Web开发', '星期一', '0800', '0950');
/*!40000 ALTER TABLE `course_arrangement` ENABLE KEYS */;


-- 导出  表 attendance.isgocourse 结构
CREATE TABLE IF NOT EXISTS `isgocourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(255) DEFAULT NULL,
  `stu_class` varchar(255) DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  `course_teacher` varchar(255) DEFAULT NULL,
  `course_time` varchar(2550) DEFAULT NULL COMMENT '缺课的时间',
  `is_truancy` varchar(255) DEFAULT NULL COMMENT '是否旷课 0请假 1旷课',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 正在导出表  attendance.isgocourse 的数据：~1 rows (大约)
DELETE FROM `isgocourse`;
/*!40000 ALTER TABLE `isgocourse` DISABLE KEYS */;
INSERT INTO `isgocourse` (`id`, `stu_id`, `stu_class`, `course_id`, `course_teacher`, `course_time`, `is_truancy`) VALUES
	(1, '2511150406', '软件三班', '20190211203657596', '阿华', '1550037600000', '1');
/*!40000 ALTER TABLE `isgocourse` ENABLE KEYS */;


-- 导出  表 attendance.leave 结构
CREATE TABLE IF NOT EXISTS `leave` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `leave_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '请假信息编号（年月日时分+01）',
  `stu_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '学号',
  `application_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '申请请假时间',
  `start_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '请假开始时间',
  `end_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '请假结束时间',
  `leave_day` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '请假天数',
  `approval_tea` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '审批老师编号',
  `status` varchar(20) CHARACTER SET utf8 DEFAULT '0' COMMENT '审批状态 0：不成功(默认)；1：批准',
  `leavecourse_tea` varchar(2550) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.leave 的数据：~0 rows (大约)
DELETE FROM `leave`;
/*!40000 ALTER TABLE `leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `leave` ENABLE KEYS */;


-- 导出  表 attendance.reportcourse 结构
CREATE TABLE IF NOT EXISTS `reportcourse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `report_course` varchar(255) CHARACTER SET utf8 NOT NULL,
  `report_week` varchar(255) CHARACTER SET utf8 NOT NULL,
  `report_time` varchar(255) CHARACTER SET utf8 NOT NULL,
  `report_day` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='签到表';

-- 正在导出表  attendance.reportcourse 的数据：~4 rows (大约)
DELETE FROM `reportcourse`;
/*!40000 ALTER TABLE `reportcourse` DISABLE KEYS */;
INSERT INTO `reportcourse` (`id`, `stu_id`, `report_course`, `report_week`, `report_time`, `report_day`) VALUES
	(2, '2511150406', '20190211203657596', '星期四', '1131', '20190214'),
	(3, '2511150567', '20190211203657596', '星期四', '1132', '20190213'),
	(4, '35234', '20190211203657596', '星期四', '1133', '20190214'),
	(5, '2511150406', '20190211203657596', '星期五', '1100', '20190215');
/*!40000 ALTER TABLE `reportcourse` ENABLE KEYS */;


-- 导出  表 attendance.student 结构
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `stu_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '学号(年级+学院+班级+000)',
  `stu_name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '姓名',
  `stu_gender` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '性别',
  `stu_identity` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '身份证号',
  `stu_phone` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '联系方式',
  `stu_class` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '所在班级',
  `stu_major` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '专业名称',
  `stu_department` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '学院名称',
  `tea_name` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '导员名称',
  `stu_password` varchar(200) CHARACTER SET utf8 DEFAULT '123456' COMMENT '学生登录密码',
  `stu_flag` varchar(50) CHARACTER SET utf8 DEFAULT '0' COMMENT '0:旷课(默认);1: 正常;2: 请假;',
  `schedule` varchar(2550) DEFAULT NULL COMMENT '个人计划',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.student 的数据：~52 rows (大约)
DELETE FROM `student`;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`id`, `stu_ID`, `stu_name`, `stu_gender`, `stu_identity`, `stu_phone`, `stu_class`, `stu_major`, `stu_department`, `tea_name`, `stu_password`, `stu_flag`, `schedule`) VALUES
	(1, '2511150406', '窦超', '女', '610615555546468', '15771776539', '软件三班', '软件工程', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(2, '2511150567', '小花', '女', '62282719960817372X', '15771776539', '软件三班', '软件工程', '信息工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(3, '2511155454', '臭臭', '男', '62282719960817372X', '15771776539', '软件四班', '软件工程', '信息工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(5, '2511150329', '苏丹丹', '女', '62282719960817372X', '15771776539', '软件三班', '软件工程', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(7, '2511150324', '楼宏亮', '男', '62282719960817372X', '15771776539', '软件三班', '软件工程', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(8, '2511150325', '南豆', '女', '62282719960817372X', '15771776539', '软件一班', '软件工程', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(9, '2511150327', '祁学鑫', '男', '62282719960817372X', '15771776539', '软件一班', '软件工程', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(10, '2511150330', '王欢欢', '女', '62282719960817372X', '15771776539', '软件一班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(11, '2511150331', '王晶', '女', '62282719960817372X', '15771776539', '软件一班', '软件工程', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(12, '2511150335', '王玉飞', '男', '62282719960817372X', '15771776539', '软件四班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(13, '2511150336', '吴文浩', '男', '62282719960817372X', '15771776539', '软件四班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(14, '2511150338', '肖天力', '男', '62282719960817372X', '15771776539', '软件四班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(15, '2511150340', '许哲', '男', '62282719960817372X', '15771776539', '软件二班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(16, '2511150342', '俞江跃', '男', '62282719960817372X', '15771776539', '软件二班', '软件工程', '信息工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(17, '2511150343', '允拓', '男', '62282719960817372X', '15771776539', '软件二班', '软件工程', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(18, '2511150344', '张栋', '男', '62282719960817372X', '15771776539', '软件二班', '软件工程', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(19, '2511150345', '张世洋', '男', '62282719960817372X', '15771776539', '电信一班', '电信专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(20, '2511150346', '郑州', '男', '62282719960817372X', '15771776539', '电信一班', '电信专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(21, '2811150130', '王翔', '男', '62282719960817372X', '15771776539', '电信一班', '电信专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(22, '2511150401', '曹誉恒', '男', '62282719960817372X', '15771776539', '电信二班', '电信专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(23, '2511150402', '陈晨', '男', '62282719960817372X', '15771776539', '电信二班', '电信专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(24, '2511150405', '程琳', '女', '62282719960817372X', '15771776539', '电信二班', '电信专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(25, '2511150407', '高保君', '男', '62282719960817372X', '15771776539', '物联网一班', '物联网专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(26, '2511150408', '胡进', '男', '62282719960817372X', '15771776539', '物联网一班', '物联网专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(27, '2511150409', '黄楠', '女', '62282719960817372X', '15771776539', '物联网二班', '物联网专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(28, '2511150410', '贾轩', '男', '62282719960817372X', '15771776539', '物联网二班', '物联网专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(29, '2511150412', '李晨晨', '男', '62282719960817372X', '15771776539', '计算机一班', '计算机专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(30, '2511150415', '刘杰', '男', '62282719960817372X', '15771776539', '计算机一班', '计算机专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(31, '2511150416', '刘康', '男', '62282719960817372X', '15771776539', '计算机一班', '计算机专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(32, '2511150417', '罗欢欢', '男', '62282719960817372X', '15771776539', '计算机二班', '计算机专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(33, '2511150418', '马文韬', '男', '62282719960817372X', '15771776539', '计算机二班', '计算机专业', '信息工程学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(34, '2511150419', '任小虎', '男', '62282719960817372X', '15771776539', '数学一班', '数学专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(35, '2511150421', '盛桐', '女', '62282719960817372X', '15771776539', '数学一班', '数学专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(36, '2511150422', '宋昱霖', '男', '62282719960817372X', '15771776539', '数学二班', '数学专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(37, '2511150423', '宋紫阳', '男', '62282719960817372X', '15771776539', '数学二班', '数学专业', '信息工程学院', '轩辕夜', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(38, '2511150426', '田小萍', '女', '62282719960817372X', '15771776539', '信科一班', '数学专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(39, '2511150427', '田远', '女', '62282719960817372X', '15771776539', '信科一班', '数学专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(40, '2511150428', '王晶', '女', '62282719960817372X', '15771776539', '信科二班', '数学专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(41, '2511150429', '王涛', '男', '62282719960817372X', '15771776539', '信科二班', '数学专业', '信息工程学院', '陈桂霞', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(42, '2511150430', '王婉', '女', '62282719960817372X', '15771776539', '非金属一班', '金属专业', '材料工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(43, '2511150432', '王昭', '男', '62282719960817372X', '15771776539', '非金属二班', '金属专业', '材料工程学院', '', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(44, '2511150433', '邢浩波', '男', '62282719960817372X', '15771776539', '金属一班', '金属专业', '材料工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(45, '2511150434', '熊森', '男', '62282719960817372X', '15771776539', '金属二班', '金属专业', '材料工程学院', '肖华', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(46, '2511150435', '许涛', '男', '62282719960817372X', '15771776539', '汽车一班', '机械材料专业', '材料工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(47, '2511150436', '闫若延', '男', '62282719960817372X', '15771776539', '汽车一班', '机械材料专业', '材料工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(48, '2511150438', '杨泽', '男', '62282719960817372X', '15771776539', '汽车二班', '机械材料专业', '材料工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(49, '2511150439', '杨泽兴', '男', '62282719960817372X', '15771776539', '汽车二班', '机械材料专业', '材料工程学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(50, '2511150441', '张兰', '女', '62282719960817372X', '15771776539', '幼师二班', '小教专业', '人文学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(51, '2511150442', '张宇', '男', '62282719960817372X', '15771776539', '幼师一班', '小教专业', '人文学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(52, '2511150445', '郑玉龙', '男', '62282719960817372X', '15771776539', '历史一班', '历史专业', '人文学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(53, '2511150446', '周永强', '男', '62282719960817372X', '15771776539', '化石一班', '化石专业', '生物学院', '马原', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777'),
	(54, '2806150108', '范超超', '男', '62282719960817372X', '15771776539', '生物一班', '生物专业', '生物学院', '刘洁琳', '123456', '1', '1111111111111111111111,2222222222222222222222,3333333333333333333333,444444444444444444444444,555555555555555555555555555,6666666666666666666666,77777777777777777777');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;


-- 导出  表 attendance.teacher 结构
CREATE TABLE IF NOT EXISTS `teacher` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `tea_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '教师编号（2019+01+000）',
  `tea_name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '姓名',
  `tea_gender` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '性别',
  `tea_department` varchar(400) CHARACTER SET utf8 NOT NULL COMMENT '学院名称',
  `tea_phone` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '联系方式',
  `tea_flag` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '导员：guide；老师：teacher',
  `tea_password` varchar(200) CHARACTER SET utf8 DEFAULT '123456' COMMENT '教师登录密码',
  `tea_class` varchar(2550) CHARACTER SET utf8 DEFAULT NULL COMMENT 'teacher带的class',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.teacher 的数据：~30 rows (大约)
DELETE FROM `teacher`;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`id`, `tea_ID`, `tea_name`, `tea_gender`, `tea_department`, `tea_phone`, `tea_flag`, `tea_password`, `tea_class`) VALUES
	(7, '2019011306', '阿华', '男', '信息工程学院', '15771776530', 'teacher', '123456', '软件三班,软件四班,计算机技术与科学一班'),
	(8, '2019011300', '刘洁琳', '女', '人文学院', '15771776539', 'guide', '123456', ''),
	(9, '2019011301', '马原', '男', '生物学院', '15771776539', 'guide', '123456', NULL),
	(10, '2019011302', '陈桂霞', '女', '信息工程学院', '15771776539', 'guide', '123456', ''),
	(11, '2019011303', '肖华', '男', '材料工程学院', '15771776539', 'guide', '123456', ''),
	(12, '2019011304', '轩辕夜', '男', '材料工程学院', '15771776539', 'guide', '123456', ''),
	(13, '2019011307', '孙少波', '男', '', '15771776530', 'teacher', '123456', ''),
	(14, '2019011308', '张宏祥', '男', '', '15771776530', 'teacher', '123456', ''),
	(15, '2019011309', '张岗亭', '男', '', '15771776530', 'teacher', '123456', ''),
	(16, '2019011310', '杨全', '女', '', '15771776530', 'teacher', '123456', ''),
	(17, '2019011311', '丁晓倩', '女', '', '15771776530', 'teacher', '123456', ''),
	(18, '2019011312', '谢巧玲', '女', '', '15771776530', 'teacher', '123456', ''),
	(19, '2019011313', '马宗宝', '男', '', '15771776530', 'teacher', '123456', ''),
	(20, '2019011314', '刘颖', '女', '', '15771776530', 'teacher', '123456', ''),
	(21, '2019011315', '袁熙', '女', '', '15771776530', 'teacher', '123456', ''),
	(22, '2019011316', '任强', '男', '', '15771776530', 'teacher', '123456', ''),
	(23, '2019011317', '赵宁社', '男', '', '15771776530', 'teacher', '123456', ''),
	(24, '2019011318', '毛艳', '女', '', '15771776530', 'teacher', '123456', ''),
	(25, '2019011319', '杨振华', '男', '', '15771776530', 'teacher', '123456', ''),
	(26, '2019011320', '朱皓月', '女', '', '15771776530', 'teacher', '123456', ''),
	(27, '2019011321', '车鹏飞', '男', '', '15771776530', 'teacher', '123456', ''),
	(28, '2019011322', '惠存杨', '男', '', '15771776530', 'teacher', '123456', ''),
	(29, '2019011323', '王宇', '男', '', '15771776530', 'teacher', '123456', ''),
	(30, '2019011324', '王玲玲', '男', '', '15771776530', 'teacher', '123456', ''),
	(31, '2019011325', '安俊龙', '男', '', '15771776530', 'teacher', '123456', ''),
	(32, '2019011326', '刘广军', '男', '', '15771776530', 'teacher', '123456', ''),
	(33, '2019011327', '张志', '男', '', '15771776530', 'teacher', '123456', ''),
	(34, '2019011328', '苏哲斌', '男', '', '15771776530', 'teacher', '123456', ''),
	(36, '2019011329', '杨倩', '女', '', '15771776530', 'teacher', '123456', ''),
	(37, '2019011330', '王淑娟', '女', '', '15771776530', 'teacher', '123456', '');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;


-- 导出  表 attendance.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '管理员账户名',
  `user_password` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.user 的数据：~1 rows (大约)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_name`, `user_password`) VALUES
	(1, 'admin', '123456');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- 导出  表 attendance.vacation 结构
CREATE TABLE IF NOT EXISTS `vacation` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `leave_ID` varchar(2550) CHARACTER SET utf8 NOT NULL COMMENT '请假信息编号（年月日时分+01）',
  `stu_ID` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '学号',
  `stu_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '请假学生姓名',
  `application_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '申请请假时间',
  `start_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '请假开始时间',
  `end_time` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '请假结束时间',
  `leave_day` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '请假天数',
  `approval_tea` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '审批老师编号',
  `status` varchar(20) CHARACTER SET utf8 DEFAULT '0' COMMENT '审批状态 0：不成功(默认)；1：批准',
  `leavecourse_tea` varchar(2550) CHARACTER SET utf8 DEFAULT NULL COMMENT '代课老师',
  `leave_reason` varchar(2550) CHARACTER SET utf8 COLLATE utf8_icelandic_ci DEFAULT NULL COMMENT '请假原因',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- 正在导出表  attendance.vacation 的数据：~3 rows (大约)
DELETE FROM `vacation`;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` (`id`, `leave_ID`, `stu_ID`, `stu_name`, `application_time`, `start_time`, `end_time`, `leave_day`, `approval_tea`, `status`, `leavecourse_tea`, `leave_reason`) VALUES
	(13, '20190207212656080', '2511150406', '窦超', '1549546016000', '1549632373000', '1550150780000', '1.7', '阿花', '0', '小臭臭，电话号', '事假'),
	(14, '1553777447000', '2511150567', '小花', '1553777446000', '1552521600000', '1552528800000', '0.25', '马原', '0', '安达市多', '事假'),
	(15, '1553777507000', '2511150567', '小花', '1553777506000', '1552629600000', '1552644000000', '0.5', '马原', '0', '安达市多', '事假');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
