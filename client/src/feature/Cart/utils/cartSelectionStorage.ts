const SELECTED_CART_ITEM_IDS_KEY = 'selectedCartItemIds';

export const getStoredSelectedCartItemIds = (): string[] | null => {
  const storedValue = localStorage.getItem(SELECTED_CART_ITEM_IDS_KEY);

  if (storedValue === null) return null;

  try {
    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) return null;

    return parsedValue.filter(
      (value): value is string => typeof value === 'string',
    );
  } catch {
    return null;
  }
};
export const saveSelectedCartItemIds = (ids: string[]) => {
  localStorage.setItem(SELECTED_CART_ITEM_IDS_KEY, JSON.stringify(ids));
};
