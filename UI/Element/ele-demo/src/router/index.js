import Vue from 'vue'
import Router from 'vue-router'
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
import FormCascader from "@/components/Form/FornCascader/FornCascader";

import NavigationBreadcrumb from "@/components/Navigation/NavigationBreadcrumb/NavigationBreadcrumb";
import NavigationDropdown from "@/components/Navigation/NavigationDropdown/NavigationDropdown";
import NavigationNavMenu from "@/components/Navigation/NavigationNavMenu/NavigationNavMenu";
import NavigationSteps from "@/components/Navigation/NavigationSteps/NavigationSteps";
import NavigationTabs from "@/components/Navigation/NavigationTabs/NavigationTabs";



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/Home",
      name: "Home",
      component: Home
    },

    {
      path: "/BasicButton",
      name: "BasicButton",
      component: BasicButton
    },
    {
      path: "/BasicColor",
      name: "BasicColor",
      component: BasicColor
    },
    {
      path: "/BasicContainer",
      name: "BasicContainer",
      component: BasicContainer
    },
    {
      path: "/BasicIcon",
      name: "BasicIcon",
      component: BasicIcon
    },
    {
      path: "/BasicLayout",
      name: "BasicLayout",
      component: BasicLayout
    },
    {
      path: "/BasicTypography",
      name: "BasicTypography",
      component: BasicTypography
    },

    {
      path: "/DateBadge",
      name: "DateBadge",
      component: DateBadge
    },
    {
      path: "/DatePagination",
      name: "DatePagination",
      component: DatePagination
    },
    {
      path: "/DateProgress",
      name: "DateProgress",
      component: DateProgress
    },
    {
      path: "/DateTable",
      name: "DateTable",
      component: DateTable
    },
    {
      path: "/DateTag",
      name: "DateTag",
      component: DateTag
    },
    {
      path: "/DateTree",
      name: "DateTree",
      component: DateTree
    },

    {
      path: "/Form",
      name: "Form",
      component: Form
    },
    {
      path: "/FormCheckbox",
      name: "FormCheckbox",
      component: FormCheckbox
    },
    {
      path: "/FormColorPicker",
      name: "FormColorPicker",
      component: FormColorPicker
    },
    {
      path: "/FormDatePicker",
      name: "FormDatePicker",
      component: FormDatePicker
    },
    {
      path: "/FormDateTimePicker",
      name: "FormDateTimePicker",
      component: FormDateTimePicker
    },
    {
      path: "/FormInput",
      name: "FormInput",
      component: FormInput
    },
    {
      path: "/FormInputNumber",
      name: "FormInputNumber",
      component: FormInputNumber
    },
    {
      path: "/FormRadio",
      name: "FormRadio",
      component: FormRadio
    },
    {
      path: "/FormRate",
      name: "FormRate",
      component: FormRate
    },
    {
      path: "/FormSelect",
      name: "FormSelect",
      component: FormSelect
    },
    {
      path: "/FormSlider",
      name: "FormSlider",
      component: FormSlider
    },
    {
      path: "/FormSwitch",
      name: "FormSwitch",
      component: FormSwitch
    },
    {
      path: "/FormTimePicker",
      name: "FormTimePicker",
      component: FormTimePicker
    },
    {
      path: "/FormTransfer",
      name: "FormTransfer",
      component: FormTransfer
    },
    {
      path: "/FormUpload",
      name: "FormUpload",
      component: FormUpload
    },
    {
      path: "/FormCascader",
      name: "FormCascader",
      component: FormCascader
    },

    {
      path: "/NavigationBreadcrumb",
      name: "NavigationBreadcrumb",
      component: NavigationBreadcrumb
    },
    {
      path: "/NavigationDropdown",
      name: "NavigationDropdown",
      component: NavigationDropdown
    },
    {
      path: "/NavigationNavMenu",
      name: "NavigationNavMenu",
      component: NavigationNavMenu
    },
    {
      path: "/NavigationSteps",
      name: "NavigationSteps",
      component: NavigationSteps
    },
    {
      path: "/NavigationTabs",
      name: "NavigationTabs",
      component: NavigationTabs
    }
  ]
});
