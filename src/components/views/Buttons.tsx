import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "@/components/common/Button";

export const sizes: ButtonSize[] = ["small", "medium", "large"];
export const variants: ButtonVariant[] = ["contained", "outlined", "text"];
export const colors: ButtonColor[] = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

export default function Buttons() {
  const Sizes = () => (
    <div className="flex flex-wrap gap-2 w-full items-center">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  );

  const Variants = () => (
    <div className="flex flex-wrap gap-2 w-full">
      {variants.map((variant) => (
        <Button key={variant} color="primary" variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );

  const Colors = () => (
    <div className="flex flex-wrap gap-2 w-full">
      {colors.map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  );

  const FullWidth = () => (
    <div className="flex flex-wrap gap-2 w-full">
      <Button fullWidth>Full Width</Button>
    </div>
  );

  const Disabled = () => (
    <div className="flex flex-wrap gap-2 w-full">
      <Button disabled>Disabled</Button>
    </div>
  );

  const Text = () => (
    <div className="flex flex-wrap gap-4">
      <div className="text-black">black</div>
      <div className="text-gray-dark">gray-dark</div>
      <div className="text-gray-medium">gray-medium</div>
      <div className="text-gray-light">gray-light</div>
      <div className="text-off-white bg-gray-medium px-2 rounded-sm">
        off-white
      </div>
      <div className="text-white bg-gray-medium px-2 rounded-sm">white</div>
    </div>
  );

  const ImageOverlay = ({ imageUrl }: { imageUrl: string }) => {
    const overlayClassName = twMerge(
      "absolute top-0 left-0 right-0 bottom-0",
      "text-4xl text-center text-gray-dark uppercase",
      "self-center"
    );

    return (
      <div className="w-80 relative mx-auto">
        <Image
          src={imageUrl}
          className="-z-10 opacity-30"
          width={1092}
          height={614}
          alt=""
        />
        <div className={overlayClassName}>Past Ticket Sales Event</div>
      </div>
    );
  };

  return (
    <table cellPadding="12" className="mx-auto mt-4">
      <tbody>
        <tr>
          <td className="text-right">Sizes</td>
          <td>
            <Sizes />
          </td>
        </tr>
        <tr>
          <td className="text-right">Variants</td>
          <td>
            <Variants />
          </td>
        </tr>
        <tr>
          <td className="text-right">Colors</td>
          <td>
            <Colors />
          </td>
        </tr>
        <tr>
          <td className="text-right">Full Width</td>
          <td>
            <FullWidth />
          </td>
        </tr>
        <tr>
          <td className="text-right">Disabled</td>
          <td>
            <Disabled />
          </td>
        </tr>
        <tr>
          <td className="text-right">Text</td>
          <td>
            <Text />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <ImageOverlay imageUrl="/heidecker-press.png" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
