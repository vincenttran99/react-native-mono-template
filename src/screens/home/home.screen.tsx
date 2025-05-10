import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "constants/theme.constant";
import { MHS } from "constants/sizes.constant";
import { ILabelValue, INotification } from "models/system.model";
import { Device } from "constants/device.constant";
import BList from "components/base/list.base";
import SkeletonListNotificationComponent from "components/skeleton/skeleton.list.notification.component";
import BImage from "components/base/image.base";
import BText from "components/base/text.base";

import HorizontalOptionsListComponent from "components/list/horizontal.options.list.component";
import { ETypeShowStepTime, ETypeTime } from "constants/date.constant";

import BView from "components/base/view.base";
import AppbarComponent from "components/appbar/appbar.component";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BIconButton from "components/base/iconButton.base";
import { useTheme } from "@shopify/restyle";
import { showInfoMessage } from "helpers/globalHelper";
import { getDateRangeHelper } from "helpers/date.helper";
import { navigateNavHelper } from "helpers/navigation.helper";
import BScrollview from "components/base/scrollview.base";

export default function HomeScreen() {
  return (
    <BView backgroundColor="background" flex={1}>
      <BScrollview></BScrollview>
    </BView>
  );
}
