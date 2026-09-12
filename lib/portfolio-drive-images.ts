/** Google Drive folder: home-of-creativity/projects */
export const PORTFOLIO_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1PwwblFFzERtf5F68fTBPYrpsN4skXXt-";

export const portfolioDriveImageIds = {
  p10_event_stage_01: "1f2zdgLm28-msTlzOWnWsi_2AK1TirB1A",
  p12_exhibition_booth_design: "1iUwK8dSrT8MG3yUmyVUO7lRvgmtVqdt3",
  p16_logos: "1TmSKv3v-1UbjOx442u77IsmFWmUnIx53",
  p21_visual_identity_application_01: "1OiiMaaGq50IgIlIxQBjr_1XZCfIMmjvM",
  p28_social_posts_01: "1tpQR_n3mW41HaAFQHWlXsLISw14TZHVU",
  p32_photography_montage: "1Io4hMcmafYlPQk2BW25_PhnigUyGvU2M",
  p39_promotional_gifts: "1AlEm9bshxoH6waNFPRkBE5ew7TbEKOLX",
  p41_roadside_advertisement: "1r4uEuLuPonr1CAkKTpq4R6EYsRGdjJmz",
  p43_website_01: "1bH8Qymk2nPG614TIcRg8oGV3aGXzEXKt",
  p47_dashboard_01: "1trhnlXZOn79VoZCdA9An4YcU6s_mtHI6",
  p48_dashboard_02: "1f_bJNQqZKik_SsaMkA-oPTetDLCZoG1L",
} as const;

export type PortfolioDriveImageKey = keyof typeof portfolioDriveImageIds;

export function portfolioDriveUrl(key: PortfolioDriveImageKey) {
  return `https://lh3.googleusercontent.com/d/${portfolioDriveImageIds[key]}=w1920`;
}

export const portfolioDriveImages = Object.fromEntries(
  (Object.keys(portfolioDriveImageIds) as PortfolioDriveImageKey[]).map((key) => [key, portfolioDriveUrl(key)]),
) as Record<PortfolioDriveImageKey, string>;
