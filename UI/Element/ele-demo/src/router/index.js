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
      path: "/button",
      name: "BasicButton",
      component: BasicButton
    },
    {
      path: "/color",
      name: "BasicColor",
      component: BasicColor
    },
    {
      path: "/container",
      name: "BasicContainer",
      component: BasicContainer
    },
    {
      path: "/icon",
      name: "BasicIcon",
      component: BasicIcon
    },
    {
      path: "/layout",
      name: "BasicLayout",
      component: BasicLayout
    },
    {
      path: "/typography",
      name: "BasicTypography",
      component: BasicTypography
    },

    {
      path: "/badge",
      name: "DateBadge",
      component: DateBadge
    },
    {
      path: "/pagination",
      name: "DatePagination",
      component: DatePagination
    },
    {
      path: "/progress",
      name: "DateProgress",
      component: DateProgress
    },
    {
      path: "/table",
      name: "DateTable",
      component: DateTable
    },
    {
      path: "/tag",
      name: "DateTag",
      component: DateTag
    },
    {
      path: "/tree",
      name: "DateTree",
      component: DateTree
    },

    {
      path: "/form",
      name: "Form",
      component: Form
    },
    {
      path: "/cascader",
      name: "FormCascader",
      component: FormCascader
    },
    {
      path: "/checkbox",
      name: "FormCheckbox",
      component: FormCheckbox
    },
    {
      path: "/colorPicker",
      name: "FormColorPicker",
      component: FormColorPicker
    },
    {
      path: "/datePicker",
      name: "FormDatePicker",
      component: FormDatePicker
    },
    {
      path: "/dateTimePicker",
      name: "FormDateTimePicker",
      component: FormDateTimePicker
    },
    {
      path: "/input",
      name: "FormInput",
      component: FormInput
    },
    {
      path: "/inputNumber",
      name: "FormInputNumber",
      component: FormInputNumber
    },
    {
      path: "/radio",
      name: "FormRadio",
      component: FormRadio
    },
    {
      path: "/rate",
      name: "FormRate",
      component: FormRate
    },
    {
      path: "/select",
      name: "FormSelect",
      component: FormSelect
    },
    {
      path: "/slider",
      name: "FormSlider",
      component: FormSlider
    },
    {
      path: "/switch",
      name: "FormSwitch",
      component: FormSwitch
    },
    {
      path: "/timePicker",
      name: "FormTimePicker",
      component: FormTimePicker
    },
    {
      path: "/transfer",
      name: "FormTransfer",
      component: FormTransfer
    },
    {
      path: "/upload",
      name: "FormUpload",
      component: FormUpload
    },

    {
      path: "/breadcrumb",
      name: "NavigationBreadcrumb",
      component: NavigationBreadcrumb
    },
    {
      path: "/dropdown",
      name: "NavigationDropdown",
      component: NavigationDropdown
    },
    {
      path: "/navMenu",
      name: "NavigationNavMenu",
      component: NavigationNavMenu
    },
    {
      path: "/steps",
      name: "NavigationSteps",
      component: NavigationSteps
    },
    {
      path: "/tabs",
      name: "NavigationTabs",
      component: NavigationTabs
    },

    {
      path: "/alert",
      name: "NoticeAlert",
      component: NoticeAlert
    },
    {
      path: "/loading",
      name: "NoticeLoading",
      component: NoticeLoading
    },
    {
      path: "/message",
      name: "NoticeMessage",
      component: NoticeMessage
    },
    {
      path: "/messageBox",
      name: "NoticeMessageBox",
      component: NoticeMessageBox
    },
    {
      path: "/notification",
      name: "NoticeNotification",
      component: NoticeNotification
    },

    {
      path: "/card",
      name: "OthersCard",
      component: OthersCard
    },
    {
      path: "/carousel",
      name: "OthersCarousel",
      component: OthersCarousel
    },
    {
      path: "/collapse",
      name: "OthersCollapse",
      component: OthersCollapse
    },
    {
      path: "/dialog",
      name: "OthersDialog",
      component: OthersDialog
    },
    {
      path: "/popover",
      name: "OthersPopover",
      component: OthersPopover
    },
    {
      path: "/tooltip",
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
