import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectFilterSelector: (FilterSelector: string) => void;
  FilterSelector: string;
}

const PlatformeSelector = ({ onSelectFilterSelector, FilterSelector }: Props) => {
  const sortOrders = [
    { value: "", label: "All" },
    { value: "snapchat", label: "Snapchat" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
  ];

  const currSortOrder = sortOrders.find((order) => order.value === FilterSelector);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Filter By: {currSortOrder?.label || "All"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectFilterSelector(order.value)}
            key={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformeSelector;
