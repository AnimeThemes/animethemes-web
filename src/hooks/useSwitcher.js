import { useState } from "react";
import { Switcher } from "components/switcher";

export default function useSwitcher(items, initialSelectedItem) {
    const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

    const SwitcherComponent = (
        <Switcher
            items={items}
            selectedItem={selectedItem}
            onChange={setSelectedItem}
        />
    );

    return [selectedItem, SwitcherComponent];
}