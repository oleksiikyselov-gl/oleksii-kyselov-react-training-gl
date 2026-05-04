import { useForm } from '@tanstack/react-form';
import { Link } from 'react-router-dom';

import { FieldInfo } from '@/components/form/FieldInfo';
import {
  userSchema,
  ROLES,
  SENIORITY_LEVELS,
  SKILS,
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
            children={field => (
              <div className="space-y-2">
                <Label>Specialization*</Label>
                <Select
                  value={field.state.value}
                  onValueChange={value =>
                    field.handleChange(value as (typeof ROLES)[number])
                  }
                >
                  <SelectTrigger onBlur={field.handleBlur}>
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
              <div className="space-y-2">
                <Label>Skills*</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-border/50 bg-muted/20 p-5 rounded-xl transition-colors hover:border-border">
                  {SKILS.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={field.state.value.includes(skill)}
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
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="w-full mt-6 h-12 text-base font-semibold shadow-md transition-all hover:shadow-lg"
                disabled={!canSubmit}
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
