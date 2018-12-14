import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/Home/Home"

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

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/",
    redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },

    {
      path: "/basicButton",
      name: "BasicButton",
      component: BasicButton
    },
    {
      path: "/basicColor",
      name: "BasicColor",
      component: BasicColor
    },
    {
      path: "/basicContainer",
      name: "BasicContainer",
      component: BasicContainer
    },
    {
      path: "/basicIcon",
      name: "BasicIcon",
      component: BasicIcon
    },
    {
      path: "/basicLayout",
      name: "BasicLayout",
      component: BasicLayout
    },
    {
      path: "/basicTypography",
      name: "BasicTypography",
      component: BasicTypography
    },

    {
      path: "/dateBadge",
      name: "DateBadge",
      component: DateBadge
    },
    {
      path: "/datePagination",
      name: "DatePagination",
      component: DatePagination
    },
    {
      path: "/dateProgress",
      name: "DateProgress",
      component: DateProgress
    },
    {
      path: "/dateTable",
      name: "DateTable",
      component: DateTable
    },
    {
      path: "/dateTag",
      name: "DateTag",
      component: DateTag
    },
    {
      path: "/dateTree",
      name: "DateTree",
      component: DateTree
    },

    {
      path: "/Form",
      name: "form",
      component: Form
    },
    {
      path: "/formCheckbox",
      name: "FormCheckbox",
      component: FormCheckbox
    },
    {
      path: "/formColorPicker",
      name: "FormColorPicker",
      component: FormColorPicker
    },
    {
      path: "/formDatePicker",
      name: "FormDatePicker",
      component: FormDatePicker
    },
    {
      path: "/formDateTimePicker",
      name: "FormDateTimePicker",
      component: FormDateTimePicker
    },
    {
      path: "/formInput",
      name: "FormInput",
      component: FormInput
    },
    {
      path: "/formInputNumber",
      name: "FormInputNumber",
      component: FormInputNumber
    },
    {
      path: "/formRadio",
      name: "FormRadio",
      component: FormRadio
    },
    {
      path: "/formRate",
      name: "FormRate",
      component: FormRate
    },
    {
      path: "/formSelect",
      name: "FormSelect",
      component: FormSelect
    },
    {
      path: "/formSlider",
      name: "FormSlider",
      component: FormSlider
    },
    {
      path: "/formSwitch",
      name: "FormSwitch",
      component: FormSwitch
    },
    {
      path: "/formTimePicker",
      name: "FormTimePicker",
      component: FormTimePicker
    },
    {
      path: "/formTransfer",
      name: "FormTransfer",
      component: FormTransfer
    },
    {
      path: "/formUpload",
      name: "FormUpload",
      component: FormUpload
    },
    {
      path: "/formCascader",
      name: "FormCascader",
      component: FormCascader
    },

    {
      path: "/navigationBreadcrumb",
      name: "NavigationBreadcrumb",
      component: NavigationBreadcrumb
    },
    {
      path: "/navigationDropdown",
      name: "NavigationDropdown",
      component: NavigationDropdown
    },
    {
      path: "/navigationNavMenu",
      name: "NavigationNavMenu",
      component: NavigationNavMenu
    },
    {
      path: "/navigationSteps",
      name: "NavigationSteps",
      component: NavigationSteps
    },
    {
      path: "/navigationTabs",
      name: "NavigationTabs",
      component: NavigationTabs
    },

    {
      path: "/noticeAlert",
      name: "NoticeAlert",
      component: NoticeAlert
    },
    {
      path: "/noticeLoading",
      name: "NoticeLoading",
      component: NoticeLoading
    },
    {
      path: "/noticeMessage",
      name: "NoticeMessage",
      component: NoticeMessage
    },
    {
      path: "/noticeMessageBox",
      name: "NoticeMessageBox",
      component: NoticeMessageBox
    },
    {
      path: "/noticeNotification",
      name: "NoticeNotification",
      component: NoticeNotification
    },

    {
      path: "/othersCard",
      name: "OthersCard",
      component: OthersCard
    },
    {
      path: "/othersCarousel",
      name: "OthersCarousel",
      component: OthersCarousel
    },
    {
      path: "/othersCollapse",
      name: "OthersCollapse",
      component: OthersCollapse
    },
    {
      path: "/othersDialog",
      name: "OthersDialog",
      component: OthersDialog
    },
    {
      path: "/othersPopover",
      name: "OthersPopover",
      component: OthersPopover
    },
    {
      path: "/othersTooltip",
      name: "OthersTooltip",
      component: OthersTooltip
    },
  ]
});
