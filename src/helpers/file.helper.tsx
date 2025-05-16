import { CONFIG } from "constants/config.constant";

import { IMedia } from "models/file.model";
import ImageCropPicker from "react-native-image-crop-picker";
import { openSettings, RESULTS } from "react-native-permissions";
import { PERMISSION } from "constants/permission.constant";

import React from "react";
import BText from "components/base/base.text";
import { PhotoFile } from "react-native-vision-camera";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import type { Orientation } from "react-native-vision-camera/src/types/Orientation";
import {
  cacheDirectory,
  getInfoAsync,
  makeDirectoryAsync,
} from "expo-file-system";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { hideGlobalLoading, showDialog } from "./global.helper";
import { requestPermissionHelper } from "./permission.helper";

export const FOLDER_CACHE = cacheDirectory + "other/";
export const FOLDER_CACHE_IMAGES = cacheDirectory + "images/";
export const FOLDER_CACHE_VIDEOS = cacheDirectory + "videos/";

export const Validation = {
  notEmpty: /\S+/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  minLength_8: /^.{8,}$/,
  phoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  onlyNumber: /^[0-9]*$/,
  biggerThan_0: /^[1-9][0-9]*$/,
  isURL: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
};

/**
 * Extracts the file extension from a given file path.
 *
 * @param {string} filePath - The path of the file.
 * @returns {string} - The file extension (without the dot), or an empty string if no extension is found.
 *
 * Example:
 * getExtensionFromFile('path/to/file.txt')
 * // Returns: 'txt'
 */
export function getFileExtensionHelper(filePath: string): string {
  const parts: string[] = filePath.split(".");
  if (parts.length > 1) {
    return parts.pop()!;
  }
  return "";
}

export function getFileNameHelper(url: string) {
  // Tách chuỗi URL thành các phần, phân tách bằng dấu "/"
  const parts = url.split("/");
  // Lấy phần cuối cùng của mảng các phần, đó chính là tên tệp
  return parts[parts.length - 1];
}

export function getFileExtensionViaCodeHelper(mime: string): string {
  let allMimes: any =
    '{"webp":["image/webp"],"png":["image/png","image/x-png"],"bmp":["image/bmp","image/x-bmp","image/x-bitmap","image/x-xbitmap","image/x-win-bitmap","image/x-windows-bmp","image/ms-bmp","image/x-ms-bmp","application/bmp","application/x-bmp","application/x-win-bitmap"],"gif":["image/gif"],"jpeg":["image/jpeg","image/pjpeg"],"xspf":["application/xspf+xml"],"vlc":["application/videolan"],"heic":["image/heic"],"heif":["image/heif"],"wmv":["video/x-ms-wmv","video/x-ms-asf"],"au":["audio/x-au"],"ac3":["audio/ac3"],"flac":["audio/x-flac"],"ogg":["audio/ogg","video/ogg","application/ogg"],"kmz":["application/vnd.google-earth.kmz"],"kml":["application/vnd.google-earth.kml+xml"],"rtx":["text/richtext"],"rtf":["text/rtf"],"jar":["application/java-archive","application/x-java-application","application/x-jar"],"zip":["application/x-zip","application/zip","application/x-zip-compressed","application/s-compressed","multipart/x-zip"],"7zip":["application/x-compressed"],"xml":["application/xml","text/xml"],"svg":["image/svg+xml"],"3g2":["video/3gpp2"],"3gp":["video/3gp","video/3gpp"],"mp4":["video/mp4","audio/mp4"],"m4a":["audio/x-m4a"],"f4v":["video/x-f4v"],"flv":["video/x-flv"],"webm":["video/webm"],"aac":["audio/x-acc"],"m4u":["application/vnd.mpegurl"],"pdf":["application/pdf","application/octet-stream"],"pptx":["application/vnd.openxmlformats-officedocument.presentationml.presentation"],"ppt":["application/powerpoint","application/vnd.ms-powerpoint","application/vnd.ms-office","application/msword"],"docx":["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],"xlsx":["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"],"xl":["application/excel"],"xls":["application/msexcel","application/x-msexcel","application/x-ms-excel","application/x-excel","application/x-dos_ms_excel","application/xls","application/x-xls"],"xsl":["text/xsl"],"mpeg":["video/mpeg"],"mov":["video/quicktime"],"avi":["video/x-msvideo","video/msvideo","video/avi","application/x-troff-msvideo"],"movie":["video/x-sgi-movie"],"log":["text/x-log"],"txt":["text/plain"],"css":["text/css"],"html":["text/html"],"wav":["audio/x-wav","audio/wave","audio/wav"],"xhtml":["application/xhtml+xml"],"tar":["application/x-tar"],"tgz":["application/x-gzip-compressed"],"psd":["application/x-photoshop","image/vnd.adobe.photoshop"],"exe":["application/x-msdownload"],"js":["application/x-javascript"],"mp3":["audio/mpeg","audio/mpg","audio/mpeg3","audio/mp3"],"rar":["application/x-rar","application/rar","application/x-rar-compressed"],"gzip":["application/x-gzip"],"hqx":["application/mac-binhex40","application/mac-binhex","application/x-binhex40","application/x-mac-binhex40"],"cpt":["application/mac-compactpro"],"bin":["application/macbinary","application/mac-binary","application/x-binary","application/x-macbinary"],"oda":["application/oda"],"ai":["application/postscript"],"smil":["application/smil"],"mif":["application/vnd.mif"],"wbxml":["application/wbxml"],"wmlc":["application/wmlc"],"dcr":["application/x-director"],"dvi":["application/x-dvi"],"gtar":["application/x-gtar"],"php":["application/x-httpd-php","application/php","application/x-php","text/php","text/x-php","application/x-httpd-php-source"],"swf":["application/x-shockwave-flash"],"sit":["application/x-stuffit"],"z":["application/x-compress"],"mid":["audio/midi"],"aif":["audio/x-aiff","audio/aiff"],"ram":["audio/x-pn-realaudio"],"rpm":["audio/x-pn-realaudio-plugin"],"ra":["audio/x-realaudio"],"rv":["video/vnd.rn-realvideo"],"jp2":["image/jp2","video/mj2","image/jpx","image/jpm"],"tiff":["image/tiff"],"eml":["message/rfc822"],"pem":["application/x-x509-user-cert","application/x-pem-file"],"p10":["application/x-pkcs10","application/pkcs10"],"p12":["application/x-pkcs12"],"p7a":["application/x-pkcs7-signature"],"p7c":["application/pkcs7-mime","application/x-pkcs7-mime"],"p7r":["application/x-pkcs7-certreqresp"],"p7s":["application/pkcs7-signature"],"crt":["application/x-x509-ca-cert","application/pkix-cert"],"crl":["application/pkix-crl","application/pkcs-crl"],"pgp":["application/pgp"],"gpg":["application/gpg-keys"],"rsa":["application/x-pkcs7"],"ics":["text/calendar"],"zsh":["text/x-scriptzsh"],"cdr":["application/cdr","application/coreldraw","application/x-cdr","application/x-coreldraw","image/cdr","image/x-cdr","zz-application/zz-winassoc-cdr"],"wma":["audio/x-ms-wma"],"vcf":["text/x-vcard"],"srt":["text/srt"],"vtt":["text/vtt"],"ico":["image/x-icon","image/x-ico","image/vnd.microsoft.icon"],"csv":["text/x-comma-separated-values","text/comma-separated-values","application/vnd.msexcel"],"json":["application/json","text/json"]}';
  allMimes = JSON.parse(allMimes);
  for (let key in allMimes) {
    if (allMimes[key].indexOf(mime) > -1) {
      return key;
    }
  }
  return "";
}

export function pickImageFromMediaHelper(
  media?: IMedia,
  size: "128x128" | "512x512" | "300x200" | "256x169" = "512x512",
  allowDefaultLogo?: boolean
) {
  return (
    media?.media_thumbnail?.[size] ||
    media?.media_url ||
    (allowDefaultLogo ? require("assets/images/logo.png") : "")
  );
}

export const selectMediaHelper = async ({
  config,
  callback,
  isNeedCrop = true,
}: {
  isNeedCrop?: boolean;
  callback: (images: any) => void;
  config: any;
}) => {
  const permission = await requestPermissionHelper(
    PERMISSION.permissionLibrary
  );

  if (permission === RESULTS.BLOCKED) {
    showDialog({
      title: i18n._(msg`Truy cập thư viện bị từ chối`),
      content: <BText>{i18n._(msg`Truy cập cài đặt để cấp quyền?`)}</BText>,
      negativeButton: {
        title: i18n._(msg`Hủy`),
      },
      positiveButton: {
        title: i18n._(msg`Mở cài đặt`),
        onPress: async () =>
          await openSettings().catch(() =>
            console.warn("cannot open settings")
          ),
      },
    });
    return;
  }
  if (permission !== RESULTS.GRANTED) {
    return;
  }
  if (isNeedCrop) {
    ImageCropPicker.openPicker({
      smartAlbums: [
        "Favorites",
        "Screenshots",
        "Generic",
        "AllHidden",
        "RecentlyAdded",
        "Imported",
        "LivePhotos",
        "Panoramas",
        "Bursts",
        "UserLibrary",
        "SyncedAlbum",
        "Regular",
      ],
      ...config,
    })
      .then(async (image) => {
        if (image) {
          callback?.(image);
        }
      })
      .catch(console.log)
      .finally(() => hideGlobalLoading());
    return;
  }

  // launchImageLibrary({
  //     selectionLimit: 0,
  //     includeExtra: true,
  //     ...config
  // })
  //     .then((image) => {
  //         if (image.assets?.[0]) {
  //             callback?.(image.assets)
  //         }
  //     })
  //     .catch(console.log)
  //     .finally(() => hideLoading())
};

// Hàm chuyển đổi từ PhotoFile sang PhotoIdentifier
export function convertPhotoFileToIdentifierHelper(
  photoFile: PhotoFile
): PhotoIdentifier | null {
  // Kiểm tra tính hợp lệ của photoFile trước khi thực hiện chuyển đổi
  if (!photoFile || typeof photoFile.path !== "string") {
    console.error("Invalid photoFile data");
    return null;
  }

  try {
    // Lấy tên file từ path, có thể sử dụng regex hoặc split
    const filename = photoFile.path.split("/").pop() || "";

    // Tạo đối tượng PhotoIdentifier từ PhotoFile
    const photoIdentifier: PhotoIdentifier = {
      node: {
        id: filename.split(".")?.[0], // Giả định tạo id ngẫu nhiên
        type: "camera", // Bạn có thể tùy chỉnh lại tùy thuộc vào loại file
        subTypes: "PhotoLive",
        sourceType: "UserLibrary",
        group_name: [], // Đặt tên nhóm mặc định
        image: {
          filename: filename,
          filepath: photoFile.path,
          extension: filename ? filename?.split(".")?.pop() || "jpg" : null, // Lấy đuôi file (extension)
          uri: photoFile.path, // URI với tiền tố 'file://'
          height: photoFile.height || 0, // Kiểm tra height
          width: photoFile.width || 0, // Kiểm tra width
          fileSize: null, // Không có thông tin kích thước file từ PhotoFile
          playableDuration: 0, // Không có duration vì đây là ảnh, có thể bỏ qua
          orientation: photoFile.orientation
            ? convertOrientationHelper(photoFile.orientation)
            : null, // Chuyển đổi orientation
        },
        timestamp: Date.now(), // Mặc định thời gian hiện tại
        modificationTimestamp: Date.now(), // Mặc định thời gian hiện tại
        location: null, // Có thể gán giá trị location nếu có từ metadata
      },
    };

    return photoIdentifier;
  } catch (error) {
    console.error("Error converting PhotoFile to PhotoIdentifier:", error);
    return null;
  }
}

export async function createFolderHelper(pathFolder: string): Promise<boolean> {
  const dirInfo = await getInfoAsync(pathFolder);
  if (dirInfo.exists) {
    return true;
  } else {
    try {
      await makeDirectoryAsync(pathFolder, {
        intermediates: true,
      });
      return true;
    } catch (error) {
      console.error("Error creating directory:", error);
      return false;
    }
  }
}

// Hàm hỗ trợ để chuyển đổi orientation từ PhotoFile sang PhotoIdentifier
function convertOrientationHelper(orientation: Orientation): number {
  switch (orientation) {
    case "portrait-upside-down":
      return 1;
    case "portrait":
      return 6;
    case "landscape-left":
      return 8;
    case "landscape-right":
      return 3;
    default:
      return 1; // Mặc định là landscape
  }
}
