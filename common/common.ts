import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Swiper as ReactSwiper } from "swiper/react";
export type LayoutProps = {
  children: ReactNode;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface SwiperProps extends React.ComponentProps<typeof ReactSwiper> {
  hideNavigation?: boolean;
  isOverflowHidden?: boolean;
  defaultActiveSlide?: number;
}

export const MILLISECOND_PER_HOUR = 60 * 60 * 1000;

export const bannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
