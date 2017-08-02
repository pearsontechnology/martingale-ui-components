'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beer = require('react-icons/lib/fa/beer');

var _beer2 = _interopRequireDefault(_beer);

var _dashboard = require('react-icons/lib/fa/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _user = require('react-icons/lib/fa/user');

var _user2 = _interopRequireDefault(_user);

var _sliders = require('react-icons/lib/fa/sliders');

var _sliders2 = _interopRequireDefault(_sliders);

var _signOut = require('react-icons/lib/fa/sign-out');

var _signOut2 = _interopRequireDefault(_signOut);

var _inbox = require('react-icons/lib/fa/inbox');

var _inbox2 = _interopRequireDefault(_inbox);

var _bolt = require('react-icons/lib/fa/bolt');

var _bolt2 = _interopRequireDefault(_bolt);

var _plug = require('react-icons/lib/fa/plug');

var _plug2 = _interopRequireDefault(_plug);

var _code = require('react-icons/lib/fa/code');

var _code2 = _interopRequireDefault(_code);

var _server = require('react-icons/lib/fa/server');

var _server2 = _interopRequireDefault(_server);

var _commentsO = require('react-icons/lib/fa/comments-o');

var _commentsO2 = _interopRequireDefault(_commentsO);

var _tasks = require('react-icons/lib/fa/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _shoppingBasket = require('react-icons/lib/fa/shopping-basket');

var _shoppingBasket2 = _interopRequireDefault(_shoppingBasket);

var _ambulance = require('react-icons/lib/fa/ambulance');

var _ambulance2 = _interopRequireDefault(_ambulance);

var _calendarO = require('react-icons/lib/fa/calendar-o');

var _calendarO2 = _interopRequireDefault(_calendarO);

var _stickyNoteO = require('react-icons/lib/fa/sticky-note-o');

var _stickyNoteO2 = _interopRequireDefault(_stickyNoteO);

var _money = require('react-icons/lib/fa/money');

var _money2 = _interopRequireDefault(_money);

var _database = require('react-icons/lib/fa/database');

var _database2 = _interopRequireDefault(_database);

var _sitemap = require('react-icons/lib/fa/sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _clockO = require('react-icons/lib/fa/clock-o');

var _clockO2 = _interopRequireDefault(_clockO);

var _question = require('react-icons/lib/fa/question');

var _question2 = _interopRequireDefault(_question);

var _certificate = require('react-icons/lib/fa/certificate');

var _certificate2 = _interopRequireDefault(_certificate);

var _security = require('react-icons/lib/md/security');

var _security2 = _interopRequireDefault(_security);

var _bellO = require('react-icons/lib/fa/bell-o');

var _bellO2 = _interopRequireDefault(_bellO);

var _questionCircle = require('react-icons/lib/fa/question-circle');

var _questionCircle2 = _interopRequireDefault(_questionCircle);

var _reactIconBase = require('react-icon-base');

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MakeIcon = function MakeIcon(_ref) {
  var source = _ref.source,
      width = _ref.width,
      height = _ref.height;

  if (!source) {
    console.error('MakeIcon called without source');
  }
  if (!width) {
    console.error('MakeIcon called without width', source);
  }
  if (!height) {
    console.error('MakeIcon called without height', source);
  }
  var inner = typeof source !== 'string' ? _react2.default.createElement(
    'g',
    null,
    source
  ) : _react2.default.createElement('g', { dangerouslySetInnerHTML: { __html: source } });
  return function (props) {
    return _react2.default.createElement(
      _reactIconBase2.default,
      Object.assign({ viewBox: '0 0 ' + width + ' ' + height }, props),
      inner
    );
  };
};

var IconLogo = MakeIcon({
  source: _react2.default.createElement('path', {
    d: 'm 130.76691,1.6507189 c -15.48313,1.3491599 -20.04956,19.2834761 -22.238,32.0044161 -7.30665,42.898721 -8.739267,86.526015 -12.151208,129.848825 -2.422184,35.23424 -2.826559,70.61256 -1.642036,105.88708 2.103718,6.44052 10.805424,23.33118 -3.408634,16.55704 -25.832561,-17.44493 -39.026949,-47.65507 -46.563884,-76.86211 -5.565289,-27.64709 -3.230074,-56.17599 -1.159716,-84.08341 -2.258265,-12.95692 11.285905,-22.39759 6.064563,-35.149442 -7.344291,-17.05811 -28.266939,2.509813 -16.936516,12.478992 4.299598,15.41052 -1.031718,31.32717 -0.246979,47.00674 -0.584795,18.87567 -0.778034,37.93916 2.736257,56.57333 -10.532813,-31.05397 -12.538392,-64.11587 -15.44238,-96.52261 8.029677,-9.591661 1.324067,-30.621361 -13.06377,-22.020284 -13.1322596,8.959704 1.7080683,18.469504 3.1355779,28.565064 1.8765771,17.10993 2.7545421,34.61722 7.5586871,51.20698 1.542494,11.42243 2.325624,23.51936 6.355487,34.67217 10.198975,30.28823 25.228933,60.04151 48.355563,82.51682 11.730454,10.51285 28.783958,15.19364 43.882728,9.66723 16.09194,-5.00942 32.91408,-7.60392 48.69839,-13.5011 13.1146,-5.63918 24.76396,-15.27358 31.59606,-27.92883 3.13877,-24.83952 8.52318,-49.38251 10.26127,-74.39172 -0.57225,-14.1651 11.12877,-36.31483 -2.71511,-45.39083 -15.60273,-2.98279 -12.98197,15.41221 -10.94212,24.82466 -1.85562,30.99789 -7.94779,61.60492 -12.57508,92.28903 -6.8842,17.21069 -25.50697,24.19978 -42.07747,28.40134 -6.35514,-3.37327 2.00665,-18.82341 -0.1539,-27.25076 0.32106,-18.78945 0.0628,-37.86603 4.27192,-56.26215 3.97829,-12.64985 17.15211,-24.36296 12.19628,-38.4585 -5.90893,-9.76104 -1.98999,-22.46675 -2.62046,-33.47934 0.97475,-30.089529 3.78963,-60.289294 1.17911,-90.357145 -0.2914,-12.354504 -5.21662,-27.4146289 -18.77718,-30.5058121 l -1.76058,-0.2635268 z m 0.37025,7.7469531 c 12.97356,4.34361 13.45134,20.663086 14.37622,32.113575 1.10843,34.708667 -1.88591,69.413623 -1.12033,104.118913 3.6337,12.37388 -1.35868,22.79227 -5.67687,34.03527 -6.79296,28.54312 -8.97233,57.95642 -9.61899,87.1912 2.43871,16.17879 -18.83145,20.65299 -25.01979,6.52833 -2.18618,-9.48415 -0.51655,-19.77721 -1.1479,-29.6224 -0.0544,-52.33364 4.59706,-104.52815 8.69043,-156.658269 2.78367,-22.144075 2.93282,-44.993628 10.10444,-66.309981 2.10065,-4.081025 4.04995,-10.9672541 9.41279,-11.396638 z M 9.9836315,88.461266 9.7424956,88.441742 Z m 32.7631765,0.188997 c 5.540767,6.415829 0.435337,17.368527 -6.058451,7.288806 -2.919537,-5.003145 3.684174,-5.001669 6.058451,-7.288806 z M 13.101101,91.905206 C 25.72412,96.353821 6.7677593,108.45552 9.0082871,96.312053 9.3650384,94.342166 10.70064,91.656898 13.101101,91.905206 Z m 22.572406,2.674588 c -0.654535,5.544106 -5.778118,-3.005904 0,0 z m 1.210538,20.589176 c 1.507724,3.97213 -3.58099,-0.20285 0,0 z M 20.901493,172.3395 c -5.075072,2.04117 -0.643422,-5.93249 0,0 z'
  }),
  width: 190,
  height: 295
});

/*
const IconLogo = (props)=>(
  <Icon viewBox="0 0 190 295" {...props}>
    <g>
       <path
          d="m 130.76691,1.6507189 c -15.48313,1.3491599 -20.04956,19.2834761 -22.238,32.0044161 -7.30665,42.898721 -8.739267,86.526015 -12.151208,129.848825 -2.422184,35.23424 -2.826559,70.61256 -1.642036,105.88708 2.103718,6.44052 10.805424,23.33118 -3.408634,16.55704 -25.832561,-17.44493 -39.026949,-47.65507 -46.563884,-76.86211 -5.565289,-27.64709 -3.230074,-56.17599 -1.159716,-84.08341 -2.258265,-12.95692 11.285905,-22.39759 6.064563,-35.149442 -7.344291,-17.05811 -28.266939,2.509813 -16.936516,12.478992 4.299598,15.41052 -1.031718,31.32717 -0.246979,47.00674 -0.584795,18.87567 -0.778034,37.93916 2.736257,56.57333 -10.532813,-31.05397 -12.538392,-64.11587 -15.44238,-96.52261 8.029677,-9.591661 1.324067,-30.621361 -13.06377,-22.020284 -13.1322596,8.959704 1.7080683,18.469504 3.1355779,28.565064 1.8765771,17.10993 2.7545421,34.61722 7.5586871,51.20698 1.542494,11.42243 2.325624,23.51936 6.355487,34.67217 10.198975,30.28823 25.228933,60.04151 48.355563,82.51682 11.730454,10.51285 28.783958,15.19364 43.882728,9.66723 16.09194,-5.00942 32.91408,-7.60392 48.69839,-13.5011 13.1146,-5.63918 24.76396,-15.27358 31.59606,-27.92883 3.13877,-24.83952 8.52318,-49.38251 10.26127,-74.39172 -0.57225,-14.1651 11.12877,-36.31483 -2.71511,-45.39083 -15.60273,-2.98279 -12.98197,15.41221 -10.94212,24.82466 -1.85562,30.99789 -7.94779,61.60492 -12.57508,92.28903 -6.8842,17.21069 -25.50697,24.19978 -42.07747,28.40134 -6.35514,-3.37327 2.00665,-18.82341 -0.1539,-27.25076 0.32106,-18.78945 0.0628,-37.86603 4.27192,-56.26215 3.97829,-12.64985 17.15211,-24.36296 12.19628,-38.4585 -5.90893,-9.76104 -1.98999,-22.46675 -2.62046,-33.47934 0.97475,-30.089529 3.78963,-60.289294 1.17911,-90.357145 -0.2914,-12.354504 -5.21662,-27.4146289 -18.77718,-30.5058121 l -1.76058,-0.2635268 z m 0.37025,7.7469531 c 12.97356,4.34361 13.45134,20.663086 14.37622,32.113575 1.10843,34.708667 -1.88591,69.413623 -1.12033,104.118913 3.6337,12.37388 -1.35868,22.79227 -5.67687,34.03527 -6.79296,28.54312 -8.97233,57.95642 -9.61899,87.1912 2.43871,16.17879 -18.83145,20.65299 -25.01979,6.52833 -2.18618,-9.48415 -0.51655,-19.77721 -1.1479,-29.6224 -0.0544,-52.33364 4.59706,-104.52815 8.69043,-156.658269 2.78367,-22.144075 2.93282,-44.993628 10.10444,-66.309981 2.10065,-4.081025 4.04995,-10.9672541 9.41279,-11.396638 z M 9.9836315,88.461266 9.7424956,88.441742 Z m 32.7631765,0.188997 c 5.540767,6.415829 0.435337,17.368527 -6.058451,7.288806 -2.919537,-5.003145 3.684174,-5.001669 6.058451,-7.288806 z M 13.101101,91.905206 C 25.72412,96.353821 6.7677593,108.45552 9.0082871,96.312053 9.3650384,94.342166 10.70064,91.656898 13.101101,91.905206 Z m 22.572406,2.674588 c -0.654535,5.544106 -5.778118,-3.005904 0,0 z m 1.210538,20.589176 c 1.507724,3.97213 -3.58099,-0.20285 0,0 z M 20.901493,172.3395 c -5.075072,2.04117 -0.643422,-5.93249 0,0 z"
          />
    </g>
  </Icon>
);
*/

exports.default = {
  MakeIcon: MakeIcon,
  IconLogo: IconLogo,
  IconConsumer: _beer2.default,
  IconDashboard: _dashboard2.default,
  IconUser: _user2.default,
  IconSettings: _sliders2.default,
  IconLogOut: _signOut2.default,
  IconInbox: _inbox2.default,
  IconAlert: _bolt2.default,
  IconPlugin: _plug2.default,
  IconAPI: _code2.default,
  IconCluster: _server2.default,
  IconComment: _commentsO2.default,
  IconTask: _tasks2.default,
  IconOrder: _shoppingBasket2.default,
  IconSupport: _ambulance2.default,
  IconCalendar: _calendarO2.default,
  IconNote: _stickyNoteO2.default,
  IconBilling: _money2.default,
  IconDatabase: _database2.default,
  IconGateway: _sitemap2.default,
  IconTimer: _clockO2.default,
  IconQuestion: _question2.default,
  IconCertificate: _certificate2.default,
  IconSNI: _security2.default,
  IconKitchensink: _bellO2.default,
  IconUnknown: _questionCircle2.default
};