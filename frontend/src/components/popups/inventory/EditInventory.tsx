import {
  Button,
  Input,
  ComboBox,
  ComboBoxItem,
  Form,
  FormItem,
  Label,
  BusyIndicator,
} from "@ui5/webcomponents-react";
import { useState } from "react";
import { InventoryItem } from "../../../services/api/inventory.service";
import TemplatePopup from "../TemplatePopup";

interface EditInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  data: InventoryItem[];
  onSave: (updatedItem: InventoryItem) => Promise<void>;
}

export default function EditInventory({ isOpen, onClose, data, onSave }: EditInventoryProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryMap = data.reduce((acc, item) => {
    if (item.CATEGORIA && !acc[item.CATEGORIA]) {
      acc[item.CATEGORIA] = item.CATEGORIA_ID;
    }
    return acc;
  }, {} as Record<string, number>);

  const uniqueCategories = Object.keys(categoryMap);

  const handleItemSelect = (e: any) => {
    const selectedValue = e.target.value;
    if (!selectedValue) {
      setSelectedItem(null);
      return;
    }

    const item = data.find((item) => item.NOMBRE_PRODUCTO === selectedValue);
    if (item) {
      setSelectedItem({
        ...item,
        PRECIO_UNITARIO: item.PRECIO_UNITARIO || "0",
      });
    }
    setError(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedItem) return;
    
    try {
      setIsSaving(true);
      setError(null);
      const itemToSave = {
        ...selectedItem,
        ID: selectedItem.ID,
        PRODUCTO_ID: selectedItem.PRODUCTO_ID
      };
      await onSave(itemToSave);
      onClose();
    } catch (err) {
      setError('Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof InventoryItem, value: string | number) => {
    setSelectedItem(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleCategoryChange = (e: any) => {
    const categoryName = e.detail.selectedOption.value;
    if (selectedItem) {
      setSelectedItem(prev => prev ? {
        ...prev,
        CATEGORIA: categoryName,
        CATEGORIA_ID: categoryMap[categoryName] || prev.CATEGORIA_ID
      } : null);
    }
  };

  const footer = (
    <>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        onClick={handleSaveChanges}
        design="Emphasized"
        disabled={!selectedItem || isSaving}
      >
        {isSaving ? <BusyIndicator size="S" /> : "Guardar Cambios"}
      </Button>
    </>
  );

  return (
    <TemplatePopup
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Inventario"
      error={error}
      onErrorClose={() => setError(null)}
      footer={footer}
    >
      <Form>
        <FormItem>
          <Label>Producto</Label>
          <ComboBox
            placeholder="Buscar artículo"
            onChange={handleItemSelect}
            value={selectedItem?.NOMBRE_PRODUCTO || ""}
          >
            {data.map((item) => (
              <ComboBoxItem 
                key={item.ID} 
                text={item.NOMBRE_PRODUCTO} 
                data-id={item.ID}
              />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Nombre</Label>
          <Input
            value={selectedItem?.NOMBRE_PRODUCTO || ""}
            onInput={(e) => handleInputChange('NOMBRE_PRODUCTO', (e.target as unknown as HTMLInputElement).value)}
          />
        </FormItem>

        <FormItem>
          <Label>Categoría</Label>
          <ComboBox
            value={selectedItem?.CATEGORIA || ""}
            onChange={handleCategoryChange}
          >
            <ComboBoxItem text="Seleccionar categoría" />
            {uniqueCategories.map((cat) => (
              <ComboBoxItem key={cat} text={cat} />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Cantidad</Label>
          <Input
            type="Number"
            value={selectedItem ? String(selectedItem.CANTIDAD) : ""}
            onInput={(e) => handleInputChange('CANTIDAD', parseInt((e.target as unknown as HTMLInputElement).value) || 0)}
          />
        </FormItem>

        <FormItem>
          <Label>Descripción</Label>
          <Input
            value={selectedItem?.DESCRIPCION || ""}
            onInput={(e) => handleInputChange('DESCRIPCION', (e.target as unknown as HTMLInputElement).value)}
          />
        </FormItem>

        <FormItem>
          <Label>Ubicación</Label>
          <Input
            value={selectedItem?.UBICACION || ""}
            onInput={(e) => handleInputChange('UBICACION', (e.target as unknown as HTMLInputElement).value)}
          />
        </FormItem>

        <FormItem>
          <Label>Precio Unitario</Label>
          <Input
            type="Number"
            value={selectedItem?.PRECIO_UNITARIO || ""}
            onInput={(e) => handleInputChange('PRECIO_UNITARIO', (e.target as unknown as HTMLInputElement).value)}
          />
        </FormItem>
      </Form>
    </TemplatePopup>
  );
}
