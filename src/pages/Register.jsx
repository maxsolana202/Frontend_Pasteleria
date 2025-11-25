import React, { useState } from 'react';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: '',
        confirmarPassword: '',
        telefono: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Validación en tiempo real
        if (errors[id]) {
            validateField(id, value);
        }
    };

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };

        switch (fieldName) {
            case 'nombre':
                if (value.trim().length < 3) {
                    newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
                } else {
                    delete newErrors.nombre;
                }
                break;

            case 'correo':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    newErrors.correo = 'Ingrese un correo válido';
                } else {
                    delete newErrors.correo;
                }
                break;

            case 'password':
                if (value.length < 6) {
                    newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
                } else {
                    delete newErrors.password;
                }
                break;

            case 'confirmarPassword':
                if (value !== formData.password) {
                    newErrors.confirmarPassword = 'Las contraseñas no coinciden';
                } else {
                    delete newErrors.confirmarPassword;
                }
                break;

            case 'telefono':
                if (value.trim() && !/^\d{7,15}$/.test(value.trim())) {
                    newErrors.telefono = 'Ingrese un número de teléfono válido';
                } else {
                    delete newErrors.telefono;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        if (formData.nombre.trim().length < 3) {
            newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo.trim())) {
            newErrors.correo = 'Ingrese un correo válido';
        }

        // Validar contraseña
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        // Validar confirmación de contraseña
        if (formData.confirmarPassword !== formData.password) {
            newErrors.confirmarPassword = 'Las contraseñas no coinciden';
        }

        // Validar teléfono (opcional)
        if (formData.telefono.trim() && !/^\d{7,15}$/.test(formData.telefono.trim())) {
            newErrors.telefono = 'Ingrese un número de teléfono válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        if (validateForm()) {
            // Simular envío del formulario
            setTimeout(() => {
                // Guardar en localStorage (igual que en la versión original)
                localStorage.setItem(formData.nombre.trim(), JSON.stringify({
                    nombre: formData.nombre.trim(),
                    email: formData.correo.trim(),
                    password: formData.password.trim(),
                    telefono: formData.telefono.trim()
                }));

                setSubmitMessage('success');
                setIsSubmitting(false);
                
                // Limpiar formulario después del éxito
                setFormData({
                    nombre: '',
                    correo: '',
                    password: '',
                    confirmarPassword: '',
                    telefono: ''
                });

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = '/inicio-sesion';
                }, 2000);

            }, 1000);
        } else {
            setIsSubmitting(false);
            setSubmitMessage('error');
            
            // Enfocar el primer campo con error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                document.getElementById(firstErrorField)?.focus();
            }
        }
    };

    const getInputClass = (fieldName) => {
        if (errors[fieldName]) {
            return 'form-control is-invalid';
        }
        if (formData[fieldName] && !errors[fieldName]) {
            return 'form-control is-valid';
        }
        return 'form-control';
    };

    return (
        <div className="registro-page">
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Formulario de Registro</h2>
                        
                        {submitMessage === 'success' && (
                            <div className="alert alert-success">
                                ¡Registro exitoso! Redirigiendo...
                            </div>
                        )}
                        
                        {submitMessage === 'error' && (
                            <div className="alert alert-danger">
                                Error, corrige los campos marcados
                            </div>
                        )}

                        <form id="registroForm" onSubmit={handleSubmit}>
                            {/* Nombre */}
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                                <input 
                                    type="text" 
                                    className={getInputClass('nombre')}
                                    id="nombre" 
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField('nombre', e.target.value)}
                                    placeholder="Ingresa tu nombre completo"
                                />
                                <div id="nombreHelp" className="form-text">
                                    Este será tu nombre visible en tu cuenta.
                                </div>
                                {errors.nombre && (
                                    <div className="invalid-feedback">
                                        {errors.nombre}
                                    </div>
                                )}
                            </div>

                            {/* Correo */}
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                <input 
                                    type="email" 
                                    className={getInputClass('correo')}
                                    id="correo" 
                                    value={formData.correo}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField('correo', e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                />
                                <div id="correoHelp" className="form-text">
                                    Nunca compartiremos tu correo electrónico con nadie más.
                                </div>
                                {errors.correo && (
                                    <div className="invalid-feedback">
                                        {errors.correo}
                                    </div>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    className={getInputClass('password')}
                                    id="password" 
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField('password', e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Confirmar Contraseña */}
                            <div className="mb-3">
                                <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
                                <input 
                                    type="password" 
                                    className={getInputClass('confirmarPassword')}
                                    id="confirmarPassword" 
                                    value={formData.confirmarPassword}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField('confirmarPassword', e.target.value)}
                                    placeholder="Confirma tu contraseña"
                                />
                                {errors.confirmarPassword && (
                                    <div className="invalid-feedback">
                                        {errors.confirmarPassword}
                                    </div>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input 
                                    type="tel" 
                                    className={getInputClass('telefono')}
                                    id="telefono" 
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField('telefono', e.target.value)}
                                    placeholder="Ingresa tu número de teléfono (Opcional)"
                                />
                                {errors.telefono && (
                                    <div className="invalid-feedback">
                                        {errors.telefono}
                                    </div>
                                )}
                            </div>

                            {/* Botón de envío */}
                            <div className="text-center mb-3 mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-registro"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                                </button>
                            </div>

                            {/* Enlace a inicio de sesión */}
                            <div className="text-center">
                                <p>
                                    ¿Ya tienes una cuenta?{' '}
                                    <a href="/inicio-sesion" className="text-decoration-none">
                                        Inicia sesión aquí
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;