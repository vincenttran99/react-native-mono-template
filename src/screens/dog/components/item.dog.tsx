import React from "react";
import { StyleSheet } from "react-native";
import BText from "@/components/base/base.text";
import { MHS } from "@/constants/sizes.constant";
import BView from "@/components/base/base.view";
import BIcon from "@/components/base/base.icon";
import { IDog } from "@/models/dog.model";
import BSurface from "@/components/base/base.surface";
import BImage from "@/components/base/base.image";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BTextMulti from "@/components/base/base.multiText";

export default function ItemDog({ item }: { item: IDog }) {
  const {
    weight,
    height,
    name,
    bred_for,
    breed_group,
    life_span,
    temperament,
    origin,
    reference_image_id,
  } = item || {};
  const { _ } = useLingui();

  return (
    <BSurface variant="md" backgroundColor={"ground"} style={styles.container}>
      <BView style={styles.imageContainer}>
        <BImage
          source={`https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`}
          style={styles.image}
          contentFit="cover"
        />
      </BView>

      <BView style={styles.infoContainer}>
        <BView style={styles.headerRow}>
          <BText variant={"lg"} fontWeight={"bold"} numberOfLines={1} flex={1}>
            {name || _(msg`No name`)}
          </BText>
          {breed_group && (
            <BView style={styles.tagContainer}>
              <BText variant={"xs"} color="primary">
                {breed_group}
              </BText>
            </BView>
          )}
        </BView>

        {bred_for && (
          <BTextMulti
            variant={"sm"}
            fontWeight={"bold"}
            numberOfLines={2}
            style2={styles.normalText}
          >
            {_(msg`Purpose`) + ": |||" + bred_for}
          </BTextMulti>
        )}

        <BView style={styles.detailsRow}>
          {life_span && (
            <BView style={styles.detailItem}>
              <BIcon name="clock-outline" size={MHS._16} color="secondary" />
              <BText variant={"xs"}>{life_span}</BText>
            </BView>
          )}

          {origin && (
            <BView style={styles.detailItem}>
              <BIcon
                name="map-marker-outline"
                size={MHS._16}
                color="secondary"
              />
              <BText variant={"xs"} numberOfLines={1} flex={1}>
                {origin}
              </BText>
            </BView>
          )}
        </BView>

        {temperament && (
          <BText variant={"xs"} numberOfLines={1} color="secondary">
            {temperament}
          </BText>
        )}

        <BView style={styles.measurementsContainer}>
          {weight?.metric && (
            <BView style={styles.measurementItem}>
              <BIcon name="weight" size={MHS._16} color="secondary" />
              <BText variant={"xs"}>{weight.metric} kg</BText>
            </BView>
          )}

          {height?.metric && (
            <BView style={styles.measurementItem}>
              <BIcon name="ruler" size={MHS._16} color="secondary" />
              <BText variant={"xs"}>{height.metric} cm</BText>
            </BView>
          )}
        </BView>
      </BView>
    </BSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: MHS._12,
    marginVertical: MHS._8,
    borderRadius: MHS._12,
    padding: MHS._12,
  },
  imageContainer: {
    width: MHS._80,
    height: MHS._80,
    borderRadius: MHS._12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: MHS._12,
  },
  infoContainer: {
    flex: 1,
    gap: MHS._6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: MHS._8,
    width: "100%",
  },
  tagContainer: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingHorizontal: MHS._8,
    paddingVertical: MHS._2,
    borderRadius: MHS._12,
  },
  detailsRow: {
    flexDirection: "row",
    gap: MHS._6,
    marginTop: MHS._2,
    width: "100%",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: MHS._4,
    flex: 1,
  },
  temperamentContainer: {
    marginTop: MHS._2,
  },
  measurementsContainer: {
    flexDirection: "row",
    gap: MHS._12,
    marginTop: MHS._4,
  },
  measurementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: MHS._4,
  },
  normalText: {
    fontWeight: "normal",
  },
});
