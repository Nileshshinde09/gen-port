import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Mail,
  Shield,
  User,
  X,
  BarChart3,
  Clock,
  MapPin,
  CalendarClock,
  UserCheck,
  AlertCircle,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "../../../components/ui/scroll-area";
import type { UserType } from "./type";
import { Auth } from "../../../services";
import AppUserStats from "../Stats/user-stat";

export default function UserProfilePage() {
  type blockDurationType =
    | "ONE_MONTH"
    | "THREE_MONTHS"
    | "ONE_YEAR"
    | "PERMANENT";
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUsers] = useState<UserType | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isUnblockDialogOpen, setIsUnblockDialogOpen] = useState(false);
  const [blockDuration, setBlockDuration] =
    useState<blockDurationType>("PERMANENT");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    (async () => {
      const response = await Auth.getUserById({ userId });
      if (response.status === 200) {
        setUsers(response?.data?.data?.user);
        setIsBlocked(response?.data?.data?.user?.blockStatus?.isBlocked);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Handle block user
  const handleBlockUser = async () => {
    if (blockDuration && user) {
      const response = await Auth.blockUser({
        payload: { blockType: blockDuration, userId: user?._id },
      });
      if (response.status === 200) {
        setIsBlocked(true);
        setIsBlockDialogOpen(false);
      }
    }
  };

  // Handle unblock user
  const handleUnblockUser = async () => {
    if (!user) return;
    const response = await Auth.unblockUser({ userId: user?._id });
    if (response.status === 200) {
      setIsBlocked(false);
      setIsUnblockDialogOpen(false);
    }
  };

  // Handle show stats
  const handleShowStats = () => {
    setActiveTab("stats");
  };
  if (isLoading) return <div>Loading...</div>;
  if (user)
    return (
      <ScrollArea className="container mx-auto py-6 overflow-y-auto h-screen px-5">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate("/dashboard/all-users")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>

        {/* Profile Header */}
        <div className="relative mb-6">
          <div className="h-48 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden"></div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage
                src={user.avatarUrl || undefined}
                alt={user.fullName}
              />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {user.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>@{user.username}</span>
              <span>•</span>
              <span className="capitalize">{user.gender}</span>
              {user.isAdmin && (
                <>
                  <span>•</span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    Admin
                  </Badge>
                </>
              )}
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
              {isBlocked && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Blocked
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleShowStats}
            >
              <BarChart3 className="h-4 w-4" />
              Show Stats
            </Button>
            {!user.isAdmin && (
              <>
                {isBlocked ? (
                  <AlertDialog
                    open={isUnblockDialogOpen}
                    onOpenChange={setIsUnblockDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <UserCheck className="h-4 w-4" />
                        Unblock User
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Unblock User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to unblock this user? They will
                          regain access to all platform features.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleUnblockUser}>
                          Unblock
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <AlertDialog
                    open={isBlockDialogOpen}
                    onOpenChange={setIsBlockDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <AlertCircle className="h-4 w-4" />
                        Block User
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Block User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Select how long you want to block this user. They will
                          lose access to platform features for the selected
                          duration.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <Select
                          value={blockDuration}
                          onValueChange={setBlockDuration}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ONE_MONTH">One Month</SelectItem>
                            <SelectItem value="THREE_MONTHS">
                              Three Months
                            </SelectItem>
                            <SelectItem value="ONE_YEAR">One Year</SelectItem>
                            <SelectItem value="PERMANENT">Permanent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleBlockUser}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Block
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p>{user.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Full Name
                        </p>
                        <p className="font-medium">{user.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.email}</p>
                          {user.isEmailVerified && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                            >
                              <Check className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Username
                        </p>
                        <p className="font-medium">@{user.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">
                          {user.isAdmin ? "Administrator" : "Regular User"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <CalendarClock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Member Since
                        </p>
                        <p className="font-medium">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Last Updated
                        </p>
                        <p className="font-medium">
                          {formatDate(user.updatedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Account Type
                        </p>
                        <p className="font-medium">
                          {user.isGuest ? "Guest Account" : "Regular Account"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              user.status === "active" ? "default" : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                          {isBlocked && (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <X className="h-3 w-3" />
                              Blocked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
                <CardDescription>
                  Overview of user activity and engagement metrics
                </CardDescription>
              </CardHeader>
              {/* <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">128</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Login Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">56</div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                  <p className="text-muted-foreground">Activity chart would appear here</p>
                </CardContent>
              </Card>
            </CardContent> */}
              <AppUserStats />
              <CardFooter className="border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Last activity: {formatDate(user.updatedAt)}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    );
}
