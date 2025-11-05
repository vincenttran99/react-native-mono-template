import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import BView from "@/components/base/base.view";
import { MHS } from "@/constants/sizes.constant";
import BImage from "@/components/base/base.image";
import isEqual from "react-fast-compare";

const IMAGE_GRID = [
  () => null,
  ({ images }: { images: string[] }) => (
    <BImage
      // cachePolicy={"memory"}
      source={images[0]}
      // recyclingKey={item.images[0]}
      style={styles.singleImage}
    />
  ),
  ({ images }: { images: string[] }) => (
    <BView style={styles.imageGrid}>
      {images.map((image, index) => (
        <BImage
          // cachePolicy={"memory"}
          key={index}
          // recyclingKey={image}
          source={image}
          style={styles.gridImage}
        />
      ))}
    </BView>
  ),
];

const IntroductionFlashlistItemMedia = ({
  images = [],
}: {
  images?: string[];
}) => {
  const indexGrid = Math.min(images?.length || 2, 2);
  const ImageUI = useMemo(() => IMAGE_GRID[indexGrid], [indexGrid]);

  return <ImageUI images={images} />;
};

const styles = StyleSheet.create({
  singleImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: MHS._8,
    marginVertical: MHS._5,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: MHS._5,
  },
  gridImage: {
    width: "48%",
    height: MHS._160,
    flexGrow: 1,
    margin: "1%",
    borderRadius: MHS._8,
  },
});

export default memo(IntroductionFlashlistItemMedia, isEqual);
