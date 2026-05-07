import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { type RegistrationData } from '@/pages/RegistrationForm/schema';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface UserDashboardProps {
  userData: RegistrationData;
  onClear: () => void;
}

export function UserDashboard({ userData, onClear }: UserDashboardProps) {
  const initials =
    `${userData.firstName[0]}${userData.lastName ? userData.lastName[0] : ''}`.toUpperCase();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="flex items-center justify-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <CardTitle className="text-3xl">
              Hello, {userData.firstName}!
            </CardTitle>
            <CardDescription className="text-lg">
              {userData.role} • {userData.seniorityLevel}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base italic">{userData.email}</p>
            </div>
            {userData.birthDate && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Birth Date
                </p>
                <p className="text-base">
                  {new Date(userData.birthDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {userData.bio && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Bio</p>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md">
                {userData.bio}
              </p>
            </div>
          )}

          {userData.skills?.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Skills
              </p>
              <ul className="flex flex-wrap gap-2">
                {userData.skills.map(skill => (
                  <li key={skill}>
                    <Badge variant="secondary">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {userData.hobbies?.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Hobbies
              </p>
              <ul className="space-y-3">
                {userData.hobbies.map((hobby, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-1 bg-muted/30 p-3 rounded-md"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{hobby.name}</span>
                      <Badge variant="secondary">
                        {hobby.yearsOfExperience} yrs
                      </Badge>
                    </div>
                    {hobby.description && (
                      <p className="text-sm text-muted-foreground italic">
                        {hobby.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onClear}
              className="w-full sm:w-auto"
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
