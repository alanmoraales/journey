"use client";

import Body from "@atoms/Body";
import Flex from "@atoms/Flex";
import Heading from "@atoms/Heading";
import When from "@atoms/When";
import usePrintConfigFormContext from "@context/PrintFormContext";
import PrintOptionRadioButton from "@molecules/PrintOptionRadioButton";
import { css } from "@styled/css";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 24"
    fill="none"
    className={css({
      width: "20px",
      height: "20px",
      display: "inline-block",
      marginBottom: "4px",
    })}
  >
    <path
      fill="#fff"
      d="M19.55 4.91A9.816 9.816 0 0 0 12.54 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.55 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.16-.47-.28Z"
    />
  </svg>
);

const PrintConfigForm = () => {
  const {
    register,
    onSubmit,
    errors,
    availableSizes,
    hasSelectedPrintSize,
    isCustomSize,
    selectedPrintSize,
    frameOptionPrice,
    deliveryIsFree,
  } = usePrintConfigFormContext();

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap="md">
        <Heading level="h6">Escoge tus opciones de compra</Heading>
        <fieldset id="print-size-options">
          <Flex flexDirection="column" gap="sm">
            <Body>1. Tamaño de impresión</Body>
            {availableSizes.map((size) => (
              <PrintOptionRadioButton
                key={size.id}
                value={size.id}
                label={`${size.displayNameInches} pulgadas`}
                secondaryLabel={`(${size.displayNameCm} cm)`}
                {...register("printSize")}
              />
            ))}
            <PrintOptionRadioButton
              value="custom"
              label="Me interesa otro tamaño*"
              {...register("printSize")}
            />
            <When condition={Boolean(errors?.printSize)}>
              <Body size="sm" fontStyle="italic" color="error">
                {errors?.printSize?.message}
              </Body>
            </When>
            <Body size="sm" weight="light" fontStyle="italic">
              * Se hará una cotización personalizada de acuerdo al tamaño
              deseado.
            </Body>
          </Flex>
        </fieldset>
        <Flex flexDirection="column" gap="sm">
          <Body>2. ¿Deseas agregar un marco?</Body>
          <fieldset id="wants-frame">
            <Flex flexDirection="column" gap="sm">
              <PrintOptionRadioButton
                value="without-frame"
                label="Sin marco"
                rightText={
                  hasSelectedPrintSize && !isCustomSize
                    ? `$${selectedPrintSize?.prices.withoutFrame} MXN`
                    : ""
                }
                {...register("wantsFrame")}
              />
              <PrintOptionRadioButton
                value="with-frame"
                label="Con marco"
                rightText={
                  hasSelectedPrintSize && !isCustomSize
                    ? `$${selectedPrintSize?.prices.withFrame} MXN`
                    : ""
                }
                {...register("wantsFrame")}
              />
              <When condition={Boolean(errors?.wantsFrame)}>
                <Body size="sm" fontStyle="italic" color="error">
                  {errors?.wantsFrame?.message}
                </Body>
              </When>
            </Flex>
          </fieldset>
        </Flex>
        <Flex flexDirection="column" gap="sm">
          <Body>3. ¿Cómo haremos la entrega de tu pedido?</Body>
          <fieldset id="shipment-type">
            <Flex flexDirection="column" gap="sm">
              <PrintOptionRadioButton
                value="pick-up"
                label="Recoger en tienda"
                rightText="Gratis"
                {...register("shipmentType")}
              />
              <PrintOptionRadioButton
                value="delivery-point"
                label="Recoger en punto de entrega"
                rightText="Gratis"
                {...register("shipmentType")}
              />
              <PrintOptionRadioButton
                value="home-delivery"
                label="A domicilio"
                rightText="+ Envío**"
                {...register("shipmentType")}
              />
              <When condition={Boolean(errors?.shipmentType)}>
                <Body size="sm" fontStyle="italic" color="error">
                  {errors?.shipmentType?.message}
                </Body>
              </When>
              <Body size="sm" weight="light" fontStyle="italic">
                ** Los precios de envío se cotizan según la distancia.
              </Body>
            </Flex>
          </fieldset>
        </Flex>
        <div
          className={css({
            position: {
              base: "fixed",
              md: "relative",
            },
            width: "100%",
            bottom: {
              base: "0",
            },
            left: {
              base: "0",
            },
            paddingY: "20px",
            background: "white",
            boxShadow: {
              base: "0 4px 30px rgba(0, 0, 0, 0.1)",
              md: "none",
            },
            display: "grid",
          })}
        >
          <button
            type="submit"
            className={css({
              backgroundColor: "#25D366",
              borderRadius: "10px",
              padding: "10px 20px",
              width: {
                base: "90%",
                md: "100%",
              },
              cursor: "pointer",
              _hover: {
                backgroundColor:
                  "color-mix(in lch, #25D366, token(colors.white) 5%)",
              },
              justifySelf: "center",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              _disabled: {
                backgroundColor: "gray",
                cursor: "not-allowed",
              },
              "&:disabled:hover": {
                backgroundColor: "gray",
              },
            })}
            disabled={!hasSelectedPrintSize}
          >
            <WhatsAppIcon />
            <Heading
              level="h6"
              color="white"
              display="inline-block"
              paddingLeft="sm"
            >
              {!hasSelectedPrintSize
                ? "Selecciona un tamaño"
                : isCustomSize
                ? "Cotizar"
                : `Ordenar por $${frameOptionPrice} MXN`}
            </Heading>
            <When
              condition={
                !deliveryIsFree && hasSelectedPrintSize && !isCustomSize
              }
            >
              <Body
                size="sm"
                weight="light"
                color="white"
                display="inline-block"
                paddingLeft="sm"
              >
                + Envío
              </Body>
            </When>
          </button>
        </div>
      </Flex>
    </form>
  );
};

export default PrintConfigForm;
