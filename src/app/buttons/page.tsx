"use client";

import { Button } from "@/components/common/Button";
import {
  colors,
  sizes,
  variants,
} from "@/components/common/Button/buttonTypes";

export default function ButtonsRoute() {
  return (
    <table cellPadding="12" className="mx-auto mt-16">
      <tbody>
        <tr>
          <td className="text-right">Sizes</td>
          <td>
            <div className="flex gap-2 w-full items-center">
              {sizes.map((size) => (
                <Button key={size} size={size}>
                  {size}
                </Button>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-right">Variants</td>
          <td>
            <div className="flex gap-2 w-full">
              {variants.map((variant) => (
                <Button key={variant} color="primary" variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-right">Colors</td>
          <td>
            <div className="flex gap-2 w-full">
              {colors.map((color) => (
                <Button key={color} color={color}>
                  {color}
                </Button>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-right">Full Width</td>
          <td>
            <div className="flex gap-2 w-full">
              <Button fullWidth>Full Width</Button>
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-right">Disabled</td>
          <td>
            <div className="flex gap-2 w-full">
              <Button disabled>Disabled</Button>
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-right">Text</td>
          <td>
            <div className="flex gap-4">
              <div className="text-black">black</div>
              <div className="text-gray-dark">gray-dark</div>
              <div className="text-gray-medium">gray-medium</div>
              <div className="text-gray-light">gray-light</div>
              <div className="text-off-white bg-gray-medium px-2 rounded-sm">off-white</div>
              <div className="text-white bg-gray-medium px-2 rounded-sm">white</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
