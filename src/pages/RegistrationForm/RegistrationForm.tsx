import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';

import { FieldInfo } from '@/components/form/FieldInfo';
import {
  userSchema,
  ROLE_SKILLS,
  ROLES,
  SENIORITY_LEVELS,
  defaultUserFormValues,
} from './schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function RegistrationForm() {
  const form = useForm({
    defaultValues: defaultUserFormValues,

    onSubmitInvalid: () => {
      const firstInvalidInput = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLElement;

      firstInvalidInput?.focus();
    },

    onSubmit: async ({ value }) => {
      console.log('Form data submitted:', value);
      alert('Success! Data printed to console.');
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-linear-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-2xl space-y-6 border border-border/50 p-8 rounded-2xl shadow-2xl bg-card/60 backdrop-blur-xl text-card-foreground relative z-10 transition-all duration-500 hover:shadow-primary/5">
        <div className="space-y-1 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Enter your registration details
          </p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/*  First Name */}
          <form.Field
            name="firstName"
            validators={{
              onChange: userSchema.shape.firstName,
            }}
            children={field => {
              const hasError =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2 max-w-80">
                  <Label htmlFor={field.name}>First Name*</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      field.handleChange(field.state.value);
                    }}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                    placeholder="John"
                    className={
                      hasError
                        ? 'border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive'
                        : ''
                    }
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          {/*  Last Name */}
          <form.Field
            name="lastName"
            validators={{
              onChange: userSchema.shape.lastName,
            }}
            children={field => {
              const hasError =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2 max-w-80">
                  <Label htmlFor={field.name}>Last Name*</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      field.handleChange(field.state.value);
                    }}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                    placeholder="Doe"
                    className={
                      hasError
                        ? 'border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive'
                        : ''
                    }
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          {/* ----- Field: Email ----- */}
          <form.Field
            name="email"
            validators={{
              onChange: userSchema.shape.email,
            }}
            children={field => {
              const hasError =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-2 max-w-80">
                  <Label htmlFor={field.name}>Email*</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      field.handleChange(field.state.value);
                    }}
                    onChange={e => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                    placeholder="example@mail.com"
                    className={
                      hasError
                        ? 'border-destructive focus-visible:ring-destructive/50 focus-visible:border-destructive'
                        : ''
                    }
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          {/*  Specialization */}
          <form.Field
            name="role"
            validators={{
              onChange: userSchema.shape.role,
            }}
            listeners={{
              onChange: ({ value }) => {
                console.log(
                  `Specialization changed to: ${value}, resetting skills...`
                );
                form.setFieldValue('skills', []);
                form.setFieldMeta('skills', meta => ({
                  ...meta,
                  isTouched: false,
                }));
              },
            }}
            children={field => (
              <div className="space-y-2">
                <Label>Specialization*</Label>
                <Select
                  value={field.state.value}
                  onValueChange={value =>
                    field.handleChange(value as (typeof ROLES)[number])
                  }
                >
                  <SelectTrigger
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldInfo field={field} />
              </div>
            )}
          />

          {/*  Seniority Level */}
          <form.Field
            name="seniorityLevel"
            validators={{
              onChange: userSchema.shape.seniorityLevel,
            }}
            children={field => (
              <div className="space-y-2">
                <Label>Seniority Level*</Label>
                <RadioGroup
                  value={field.state.value}
                  aria-invalid={field.state.meta.errors.length > 0}
                  onValueChange={value =>
                    field.handleChange(
                      value as (typeof SENIORITY_LEVELS)[number]
                    )
                  }
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-border/50 bg-muted/20 p-5 rounded-xl transition-colors hover:border-border"
                >
                  {SENIORITY_LEVELS.map((seniorityLevel, index) => {
                    const id = `seniorityLevel-${index}`;
                    return (
                      <div
                        key={seniorityLevel}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={seniorityLevel} id={id} />
                        <Label
                          htmlFor={id}
                          className="font-medium cursor-pointer text-sm"
                        >
                          {seniorityLevel}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                <FieldInfo field={field} />
              </div>
            )}
          />

          {/* Skills */}
          <form.Field
            name="skills"
            validators={{
              onChange: userSchema.shape.skills,
            }}
            children={field => (
              <form.Subscribe
                selector={state => state.values.role}
                children={selectedRole => {
                  const availableSkills = selectedRole
                    ? ROLE_SKILLS[selectedRole]
                    : [];

                  if (!selectedRole) {
                    return (
                      <div className="space-y-2">
                        <Label>Skills*</Label>
                        <p className="text-sm text-muted-foreground italic border border-border/50 bg-muted/10 p-5 rounded-xl">
                          Please select a specialization first to see available
                          skills.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-2">
                      <Label>Skills*</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-border/50 bg-muted/20 p-5 rounded-xl transition-colors hover:border-border">
                        {availableSkills.map(skill => (
                          <div
                            key={skill}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={skill}
                              checked={field.state.value.includes(skill)}
                              aria-invalid={
                                field.state.meta.errors.length > 0 &&
                                field.state.meta.isTouched
                              }
                              onCheckedChange={checked => {
                                const nextValue = checked
                                  ? [...field.state.value, skill]
                                  : field.state.value.filter(s => s !== skill);
                                field.handleChange(nextValue);
                              }}
                            />
                            <Label
                              htmlFor={skill}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
            )}
          />

          {/* Hobbies (Array Field) */}
          <form.Field
            name="hobbies"
            mode="array"
            children={hobbiesField => (
              <div className="space-y-4">
                <Label>Hobbies</Label>

                <div className="space-y-4">
                  {!hobbiesField.state.value.length ? (
                    <p className="text-sm text-muted-foreground italic">
                      No hobbies added.
                    </p>
                  ) : (
                    hobbiesField.state.value.map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-4 p-5 border border-border/50 rounded-xl bg-muted/10 relative"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => hobbiesField.removeValue(i)}
                        >
                          &times;
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <form.Field
                            name={`hobbies[${i}].name`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>Hobby Name</Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(e.target.value)
                                  }
                                  placeholder="e.g. Photography"
                                />
                                <FieldInfo field={field} />
                              </div>
                            )}
                          />
                          <form.Field
                            name={`hobbies[${i}].yearsOfExperience`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Years of Experience
                                </Label>
                                <Input
                                  id={field.name}
                                  type="number"
                                  name={field.name}
                                  value={field.state.value as number}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                                <FieldInfo field={field} />
                              </div>
                            )}
                          />
                        </div>
                        <form.Field
                          name={`hobbies[${i}].description`}
                          children={field => (
                            <div className="space-y-2">
                              <Label htmlFor={field.name}>Description</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
                                placeholder="Describe your hobby..."
                              />
                              <FieldInfo field={field} />
                            </div>
                          )}
                        />
                      </div>
                    ))
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    hobbiesField.pushValue({
                      name: '',
                      description: '',
                      yearsOfExperience: 0,
                    })
                  }
                >
                  + Add hobby
                </Button>
              </div>
            )}
          />

          {/* Bio */}
          <form.Field
            name="bio"
            validators={{
              onChange: userSchema.shape.bio,
            }}
            children={field => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Bio</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder="Tell us a bit about your experience..."
                  className="resize-none min-h-25"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />

          {/* Agreement */}
          <form.Field
            name="agreement"
            validators={{
              onChange: userSchema.shape.agreement,
            }}
            children={field => (
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={field.state.value}
                    aria-invalid={field.state.meta.errors.length > 0}
                    onCheckedChange={checked => field.handleChange(!!checked)}
                  />
                  <Label htmlFor="agreement" className="text-sm font-medium">
                    I agree to the company rules
                  </Label>
                </div>
                <FieldInfo field={field} />
              </div>
            )}
          />

          {/* Submit button */}
          <form.Subscribe
            selector={state => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <Button
                type="submit"
                className="w-full mt-6 h-12 text-base font-semibold shadow-md transition-all hover:shadow-lg"
              >
                {isSubmitting ? 'Loading...' : 'Register'}
              </Button>
            )}
          />
        </form>

        <div className="text-center border-t border-border/50 pt-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
