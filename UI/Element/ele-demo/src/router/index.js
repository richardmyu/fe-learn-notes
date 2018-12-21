import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home/Home";

import BasicButton from "@/components/Basic/BasicButton/BasicButton";
import BasicColor from "@/components/Basic/BasicColor/BasicColor";
import BasicContainer from "@/components/Basic/BasicContainer/BasicContainer";
import BasicIcon from "@/components/Basic/BasicIcon/BasicIcon";
import BasicLayout from "@/components/Basic/BasicLayout/BasicLayout";
import BasicTypography from "@/components/Basic/BasicTypography/BasicTypography";

import DateBadge from "@/components/Date/DateBadge/DateBadge";
import DatePagination from "@/components/Date/DatePagination/DatePagination";
import DateProgress from "@/components/Date/DateProgress/DateProgress";
import DateTable from "@/components/Date/DateTable/DateTable";
import DateTag from "@/components/Date/DateTag/DateTag";
import DateTree from "@/components/Date/DateTree/DateTree";

import Form from "@/components/Form/Form/Form";
import FormCheckbox from "@/components/Form/FormCheckbox/FormCheckbox";
import FormColorPicker from "@/components/Form/FormColorPicker/FormColorPicker";
import FormDatePicker from "@/components/Form/FormDatePicker/FormDatePicker";
import FormDateTimePicker from "@/components/Form/FormDateTimePicker/FormDateTimePicker";
import FormInput from "@/components/Form/FormInput/FormInput";
import FormInputNumber from "@/components/Form/FormInputNumber/FormInputNumber";
import FormRadio from "@/components/Form/FormRadio/FormRadio";
import FormRate from "@/components/Form/FormRate/FormRate";
import FormSelect from "@/components/Form/FormSelect/FormSelect";
import FormSlider from "@/components/Form/FormSlider/FormSlider";
import FormSwitch from "@/components/Form/FormSwitch/FormSwitch";
import FormTimePicker from "@/components/Form/FormTimePicker/FormTimePicker";
import FormTransfer from "@/components/Form/FormTransfer/FormTransfer";
import FormUpload from "@/components/Form/FormUpload/FormUpload";
import FormCascader from "@/components/Form/FormCascader/FormCascader";

import NavigationBreadcrumb from "@/components/Navigation/NavigationBreadcrumb/NavigationBreadcrumb";
import NavigationDropdown from "@/components/Navigation/NavigationDropdown/NavigationDropdown";
import NavigationNavMenu from "@/components/Navigation/NavigationNavMenu/NavigationNavMenu";
import NavigationSteps from "@/components/Navigation/NavigationSteps/NavigationSteps";
import NavigationTabs from "@/components/Navigation/NavigationTabs/NavigationTabs";

import NoticeAlert from "@/components/Notice/NoticeAlert/NoticeAlert";
import NoticeLoading from "@/components/Notice/NoticeLoading/NoticeLoading";
import NoticeMessage from "@/components/Notice/NoticeMessage/NoticeMessage";
import NoticeMessageBox from "@/components/Notice/NoticeMessageBox/NoticeMessageBox";
import NoticeNotification from "@/components/Notice/NoticeNotification/NoticeNotification";

import OthersCard from "@/components/Others/OthersCard/OthersCard";
import OthersCarousel from "@/components/Others/OthersCarousel/OthersCarousel";
import OthersCollapse from "@/components/Others/OthersCollapse/OthersCollapse";
import OthersDialog from "@/components/Others/OthersDialog/OthersDialog";
import OthersPopover from "@/components/Others/OthersPopover/OthersPopover";
import OthersTooltip from "@/components/Others/OthersTooltip/OthersTooltip";

import Transition from "@/components/Transition/Transition";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },

    {
      path: "/basic",
      redirect: "/basic/button"
    },
    {
      path: "/basic/button",
      name: "BasicButton",
      component: BasicButton
    },
    {
      path: "/basic/color",
      name: "BasicColor",
      component: BasicColor
    },
    {
      path: "/basic/container",
      name: "BasicContainer",
      component: BasicContainer
    },
    {
      path: "/basic/icon",
      name: "BasicIcon",
      component: BasicIcon
    },
    {
      path: "/basic/layout",
      name: "BasicLayout",
      component: BasicLayout
    },
    {
      path: "/basic/typography",
      name: "BasicTypography",
      component: BasicTypography
    },

    {
      path: "/date",
      redirect: "/date/badge"
    },
    {
      path: "/date/badge",
      name: "DateBadge",
      component: DateBadge
    },
    {
      path: "/date/pagination",
      name: "DatePagination",
      component: DatePagination
    },
    {
      path: "/date/progress",
      name: "DateProgress",
      component: DateProgress
    },
    {
      path: "/date/table",
      name: "DateTable",
      component: DateTable
    },
    {
      path: "/date/tag",
      name: "DateTag",
      component: DateTag
    },
    {
      path: "/date/tree",
      name: "DateTree",
      component: DateTree
    },

    {
      path: "/form",
      name: "Form",
      component: Form
    },
    {
      path: "/form/cascader",
      name: "FormCascader",
      component: FormCascader
    },
    {
      path: "/form/checkbox",
      name: "FormCheckbox",
      component: FormCheckbox
    },
    {
      path: "/form/colorPicker",
      name: "FormColorPicker",
      component: FormColorPicker
    },
    {
      path: "/form/datePicker",
      name: "FormDatePicker",
      component: FormDatePicker
    },
    {
      path: "/form/dateTimePicker",
      name: "FormDateTimePicker",
      component: FormDateTimePicker
    },
    {
      path: "/form/input",
      name: "FormInput",
      component: FormInput
    },
    {
      path: "/form/inputNumber",
      name: "FormInputNumber",
      component: FormInputNumber
    },
    {
      path: "/form/radio",
      name: "FormRadio",
      component: FormRadio
    },
    {
      path: "/form/rate",
      name: "FormRate",
      component: FormRate
    },
    {
      path: "/form/select",
      name: "FormSelect",
      component: FormSelect
    },
    {
      path: "/form/slider",
      name: "FormSlider",
      component: FormSlider
    },
    {
      path: "/form/switch",
      name: "FormSwitch",
      component: FormSwitch
    },
    {
      path: "/form/timePicker",
      name: "FormTimePicker",
      component: FormTimePicker
    },
    {
      path: "/form/transfer",
      name: "FormTransfer",
      component: FormTransfer
    },
    {
      path: "/form/upload",
      name: "FormUpload",
      component: FormUpload
    },

    {
      path: "/navigation",
      redirect: "/navigation/breadcrumb"
    },
    {
      path: "/navigation/breadcrumb",
      name: "NavigationBreadcrumb",
      component: NavigationBreadcrumb
    },
    {
      path: "/navigation/dropdown",
      name: "NavigationDropdown",
      component: NavigationDropdown
    },
    {
      path: "/navigation/navMenu",
      name: "NavigationNavMenu",
      component: NavigationNavMenu
    },
    {
      path: "/navigation/steps",
      name: "NavigationSteps",
      component: NavigationSteps
    },
    {
      path: "/navigation/tabs",
      name: "NavigationTabs",
      component: NavigationTabs
    },

    {
      path: "/notice",
      redirect: "/notice/alert"
    },
    {
      path: "/notice/alert",
      name: "NoticeAlert",
      component: NoticeAlert
    },
    {
      path: "/notice/loading",
      name: "NoticeLoading",
      component: NoticeLoading
    },
    {
      path: "/notice/message",
      name: "NoticeMessage",
      component: NoticeMessage
    },
    {
      path: "/notice/messageBox",
      name: "NoticeMessageBox",
      component: NoticeMessageBox
    },
    {
      path: "/notice/notification",
      name: "NoticeNotification",
      component: NoticeNotification
    },

    {
      path: "/other",
      redirect: "/other/card"
    },
    {
      path: "/other/card",
      name: "OthersCard",
      component: OthersCard
    },
    {
      path: "/other/carousel",
      name: "OthersCarousel",
      component: OthersCarousel
    },
    {
      path: "/other/collapse",
      name: "OthersCollapse",
      component: OthersCollapse
    },
    {
      path: "/other/dialog",
      name: "OthersDialog",
      component: OthersDialog
    },
    {
      path: "/other/popover",
      name: "OthersPopover",
      component: OthersPopover
    },
    {
      path: "/other/tooltip",
      name: "OthersTooltip",
      component: OthersTooltip
    },

    {
      path: "/transition",
      name: "Transition",
      component: Transition
    }
  ]
});
