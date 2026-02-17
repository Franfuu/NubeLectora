import { useState } from "react";
import { Save, X } from 'lucide-react';
import type { Libro } from "../../types/libro";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import Button from "../ui/Button";

interface FormularioLibroEditableProps {
  libroInicial?: Partial<Libro>;
  onSubmit: (libro: Partial<Libro>) => void;
  onCancel?: () => void;
  textoBtnSubmit?: string;
  textoBtnCancel?: string;
  mostrarVistaPrevia?: boolean;
}

const FormularioLibroEditable = ({ 
  libroInicial,
  onSubmit,
  onCancel,
  textoBtnSubmit = "Guardar Cambios",
  textoBtnCancel = "Cancelar",
  mostrarVistaPrevia = true
}: FormularioLibroEditableProps) => {
  const [formData, setFormData] = useState<Partial<Libro>>(libroInicial || {
    titulo: "",
    autor: "",
    portada: "",
    año: undefined,
    estado: "pendiente",
    resena: "",
    calificacion: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof Libro, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="editar-form">
      <div className="form-layout">
        {mostrarVistaPrevia && (
          <div className="form-left">
            <div className="preview-section">
              <h3>Vista Previa</h3>
              <div className="portada-preview">
                {formData.portada ? (
                  <img src={formData.portada} alt="Portada" />
                ) : (
                  <div className="portada-placeholder">Sin portada</div>
                )}
              </div>
              <p className="preview-titulo">{formData.titulo || 'Sin título'}</p>
              <p className="preview-autor">{formData.autor || 'Sin autor'}</p>
            </div>
          </div>
        )}

        <div className="form-right">
          <div className="form-section">
            <h3>Información Básica</h3>
            
            <FormInput
              label="Título *"
              id="titulo"
              type="text"
              value={formData.titulo || ''}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
              placeholder="Ej: Cien años de soledad"
            />

            <FormInput
              label="Autor *"
              id="autor"
              type="text"
              value={formData.autor || ''}
              onChange={(e) => handleChange('autor', e.target.value)}
              required
              placeholder="Ej: Gabriel García Márquez"
            />

            <div className="form-row">
              <FormInput
                label="Año de publicación"
                id="año"
                type="number"
                min={1000}
                max={new Date().getFullYear()}
                value={formData.año || ''}
                onChange={(e) => handleChange('año', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="2005"
              />

              <FormSelect
                label="Calificación"
                id="calificacion"
                value={formData.calificacion || ''}
                onChange={(e) => handleChange('calificacion', e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Sin calificación</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </FormSelect>
            </div>

            <FormInput
              label="URL de la portada"
              id="portada"
              type="url"
              value={formData.portada || ''}
              onChange={(e) => handleChange('portada', e.target.value)}
              placeholder="https://ejemplo.com/portada.jpg"
            />

            <FormSelect
              label="Estado de lectura *"
              id="estado"
              value={formData.estado || 'pendiente'}
              onChange={(e) => handleChange('estado', e.target.value as 'leido' | 'leyendo' | 'pendiente')}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="leyendo">Leyendo</option>
              <option value="leido">Leído</option>
            </FormSelect>
          </div>

          <div className="form-section">
            <h3>Mi Opinión</h3>
            
            <FormTextarea
              label="Reseña personal"
              id="resena"
              value={formData.resena || ''}
              onChange={(e) => handleChange('resena', e.target.value)}
              rows={8}
              placeholder="Escribe tu opinión sobre el libro..."
              showCharCount
            />
          </div>

          <div className="form-actions">
            {onCancel && (
              <Button 
                type="button" 
                onClick={onCancel} 
                color="secondary"
                icono={<X size={20} />}
              >
                {textoBtnCancel}
              </Button>
            )}
            <Button 
              type="submit" 
              color="success"
              icono={<Save size={20} />}
            >
              {textoBtnSubmit}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormularioLibroEditable;
