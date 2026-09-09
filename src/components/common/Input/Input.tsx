import {InputHTMLAttributes, useId} from "react";
import styled from "styled-components";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    hint?: string;
    error?: string;
}

const Field = styled.div`
    display: grid;
    gap: ${({theme}) => theme.spacing.xs};
`;

const Label = styled.label`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
    font-weight: ${({theme}) => theme.typography.fontWeight.medium};
`;

const StyledInput = styled.input<{$hasError: boolean}>`
    width: 100%;
    padding: ${({theme}) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border: 1px solid ${({theme, $hasError}) => $hasError ? theme.colors.danger : theme.colors.border};
    border-radius: ${({theme}) => theme.radii.md};
    background: ${({theme}) => theme.colors.surface};
    color: ${({theme}) => theme.colors.text};
    font: inherit;

    &:focus {
        outline: 3px solid ${({theme}) => theme.colors.focus}66;
        border-color: ${({theme}) => theme.colors.focus};
    }
`;

const HelpText = styled.span<{$error: boolean}>`
    color: ${({theme, $error}) => $error ? theme.colors.danger : theme.colors.textMuted};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
`;

export function Input({label, hint, error, id, ...props}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helpId = `${inputId}-help`;

    return (
        <Field>
            {label && <Label htmlFor={inputId}>{label}</Label>}
            <StyledInput
                {...props}
                id={inputId}
                $hasError={Boolean(error)}
                aria-describedby={hint || error ? helpId : undefined}
                aria-invalid={Boolean(error)}
            />
            {(hint || error) && (
                <HelpText id={helpId} $error={Boolean(error)}>
                    {error ?? hint}
                </HelpText>
            )}
        </Field>
    );
}
