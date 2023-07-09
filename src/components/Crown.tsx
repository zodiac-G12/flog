import type { Component } from "solid-js";
import { css } from "solid-styled-components";
import { i18n } from "@/i18next/init";
import { Img } from "@/components";

export const Crown: Component = () => {
  return (
    <div class={CrownContainer}>
      <div class={IconWithText}>
        <Img width={"60px"} height={"60px"} src={"fblok.png"} />
        <div class={ServiceName}>{i18n.t("serviceName")}</div>
      </div>
    </div>
  );
};

const CrownContainer = css({
  height: "65px",
  background: "white",
});

const IconWithText = css({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  marginTop: "2.5px",
});

const ServiceName = css({
  marginTop: "-2.5px",
  fontSize: "30px",
  height: "65px",
  fontFamily: "Gotham Bold",
  fontWeight: "Bold",
  display: "grid",
  placeItems: "center",
  color: "#698403",
  background: "white",
});
