import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  Filter, Copy } from "lucide-react";
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Portfolio as portfolioService } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getPortfolioById } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

interface visibleFields {
  avatar: number;
  bio: number;
  designation: number;
  education: number;
  email: number;
  experience: number;
  fullName: number;
  location: number;
  projects: number;
  skills: number;
  username: number;
  _id: number;
}

interface Portfolio {
  _id: string;
  access: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
  dailyTraffic: number;
  isAvatarVisible: boolean;
  isDeployed: boolean;
  owner: string;
  portfolioId: string;
  portfolioAccessToken: string;
  visibleFields: visibleFields;
}

const EditPortfolioDialog = ({ 
  portfolio, 
  onUpdate 
}: { 
  portfolio: Portfolio,
  onUpdate: (portfolioId: string, data: Partial<Portfolio>) => Promise<void>
}) => {
  const { toast } = useToast()
  const fieldLabels: Record<string, string> = {
    username: "Username",
    email: "Email",
    avatar: "Avatar",
    designation: "Designation",
    location: "Location",
    fullName: "Full Name",
    bio: "Bio",
    skills: "Skills",
    education: "Education",
    experience: "Experience",
    projects: "Projects"
  };

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    access: Portfolio['access'],
    isAvatarVisible: boolean,
    isDeployed: boolean,
    visibleFields: visibleFields | null,
    fields: Record<string, string>
  }>({
    access: portfolio.access,
    isAvatarVisible: portfolio.isAvatarVisible,
    isDeployed: portfolio.isDeployed,
    visibleFields: portfolio.visibleFields,
    fields: {}
  });

  useEffect(() => {
    const fetchDefaultFields = async () => {
      try {
        const response = await portfolioService.getPortfolio(portfolio.portfolioId);
        if (response?.status === 200) {
          setFormData(prev => ({
            ...prev,
            visibleFields: response.data.data.visibleFields,
            fields: response.data.data.fields || {}
          }));
        }
      } catch (error) {
        console.error('Error fetching default visible fields:', error);
      }
    };

    if (isOpen && !formData.visibleFields) {
      fetchDefaultFields();
    }
  }, [isOpen, portfolio.portfolioId]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value
      }
    }));
  };

  const handleVisibleFieldChange = (field: keyof visibleFields) => {
    if (!formData.visibleFields) return;
    
    setFormData(prev => ({
      ...prev,
      visibleFields: {
        ...prev.visibleFields!,
        [field]: prev.visibleFields![field] === 1 ? 0 : 1
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData: Partial<Portfolio> = {
        access: formData.access,
        isAvatarVisible: formData.isAvatarVisible,
        ...(formData.visibleFields && { visibleFields: formData.visibleFields }),
      };

      const response = await portfolioService.updatePortfolio(portfolio._id, updateData);
      if(response?.status === 200){ 
        setIsOpen(false); 
        toast({
          title: "Success",
          description: "Portfolio updated successfully",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update portfolio",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    
    
    if (!formData.visibleFields) return null;

    return (
      <div className="space-y-4">
        {Object.entries(fieldLabels).map(([field, label]) => {
          if (field === '_id') return null;

          if(!formData.visibleFields) return null;
          return (
            <div key={field} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`field-${field}`} className="text-base font-medium">
                  {label}
                </Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`visibility-${field}`} className="text-sm text-muted-foreground">
                    {formData.visibleFields[field as keyof visibleFields] === 1 ? 'Visible' : 'Hidden'}
                  </Label>
                  <Switch
                    id={`visibility-${field}`}
                    checked={formData.visibleFields[field as keyof visibleFields] === 1}
                    onCheckedChange={() => handleVisibleFieldChange(field as keyof visibleFields)}
                  />
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access">Access Type</Label>
              <Select
                value={formData.access}
                onValueChange={(value: 'public' | 'private') => 
                  setFormData(prev => ({ ...prev, access: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select access type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderFields()}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PortfolioCard = ({ 
  portfolio,
  onUpdate,
  setPortfolios,
  type
}: { 
  portfolio: Portfolio,
  onUpdate: (portfolioId: string, data: Partial<Portfolio>) => Promise<void>,
  setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[]>>,
  type:"d"|"c"
}) => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const username = useAppSelector(state => state.user.userData?.username);
  const fieldLabels: Record<string, string> = {
    username: "Username",
    email: "Email",
    avatar: "Avatar",
    designation: "Designation",
    location: "Location",
    fullName: "Full Name",
    bio: "Bio",
    skills: "Skills",
    education: "Education",
    experience: "Experience",
    projects: "Projects"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Token copied",
      description: "The portfolio access token has been copied to your clipboard.",
    });
  };

  const handleDelete = async (portfolioId: string) => {
    try {
      const response = await portfolioService.deletePortfolio(portfolioId);
      if (response?.status === 200) {
        
        toast({
          title: "Success",
          description: "Portfolio deleted successfully",
        });
        // Trigger a refresh of the portfolio list
        const updatedPortfolios = await portfolioService.getMyPortfolioList();
        if (updatedPortfolios?.status === 200) {
          setPortfolios(updatedPortfolios?.data?.data?.portfolios);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete portfolio",
      });
    }
  };

  const handleDocs = (id:string) => {
    if (!id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Portfolio ID not found",
      });
      return;
    }
    const docsURL = `/console/docs/${type}/${id}`;
    navigate(docsURL);
  }
  const handleVisit = () => {
    // if (!username) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Username not found",
    //   });
    //   return;
    // }
    
    const portfolioPath = `/p/${portfolio._id}`;
    navigate(portfolioPath);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 
                    hover:shadow-xl transition-all duration-300 ease-in-out
                    hover:border-gray-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900">
            {portfolio.portfolioId}
          </h2>
          <div className="space-y-1">
            <span className="text-sm text-gray-500 block">
              Created: {portfolio.createdAt ? format(new Date(portfolio.createdAt), 'PPP') : 'N/A'}
            </span>
            <span className="text-sm text-gray-500 block">
              Updated: {portfolio.updatedAt ? format(new Date(portfolio.updatedAt), 'PPP') : 'N/A'}
            </span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          portfolio.access === 'public' 
            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20' 
            : 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20'
        }`}>
          {portfolio.access}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <span className="text-gray-600 font-medium">Daily Traffic</span>
          <span className="font-semibold text-gray-900">
            {typeof portfolio.dailyTraffic === 'object' 
              ? (portfolio.dailyTraffic as any).count || 0  // Add type assertion
              : portfolio.dailyTraffic || 0}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <span className="text-gray-600 font-medium">Status</span>
          <span className={`px-2 py-1 rounded-md font-medium ${
            portfolio.isDeployed 
              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
              : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
          }`}>
            {portfolio.isDeployed ? 'Deployed' : 'Not Deployed'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <span className="text-gray-600 font-medium">Avatar Visible</span>
          <span className={`px-2 py-1 rounded-md font-medium ${
            portfolio.isAvatarVisible 
              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
              : 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/20'
          }`}>
            {portfolio.isAvatarVisible ? 'Yes' : 'No'}
          </span>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 font-medium">Field Visibility</span>
            <EditPortfolioDialog portfolio={portfolio} onUpdate={onUpdate} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {(() => {
              
              if (!portfolio.visibleFields) {
                return <div>No visible fields data</div>;
              }

              return Object.entries(portfolio.visibleFields)
                .filter(([key]) => key !== '_id')
                .map(([field, value]) => (
                  <div key={field} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {fieldLabels[field as keyof typeof fieldLabels] || field}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                      value === 1
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                    }`}>
                      {value === 1 ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                ));
            })()}
          </div>
        </div>

        {portfolio.portfolioAccessToken && (
          <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Access Token</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(portfolio.portfolioAccessToken)}
                className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="text-sm text-gray-500 break-all">
              {portfolio.portfolioAccessToken.substring(0, 40)}...
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3 justify-end">
      <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-yellow-700 hover:bg-yellow-50"
          onClick={() => handleDocs(portfolio._id)}
        >
          Docs
        </Button>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          onClick={handleVisit}
        >
          Visit
        </Button>
        <Button 
          variant="ghost" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => handleDelete(portfolio._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const PortfolioSkeleton = () => (
  <div className="border border-gray-200 rounded-xl p-6 bg-white">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>

    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>
    </div>

    <div className="mt-6 flex gap-3 justify-end">
      <Skeleton className="h-9 w-16" />
      <Skeleton className="h-9 w-16" />
    </div>
  </div>
);

const PortfolioGrid = ({ 
  type,
  portfolios, 
  loading, 
  accessFilter,
  setAccessFilter,
  setPortfolios 
}: { 
  type:"d"|"c",
  portfolios: Portfolio[], 
  loading: boolean,
  accessFilter: string[],
  setAccessFilter: React.Dispatch<React.SetStateAction<string[]>>,
  setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[]>>
}) => {
  const handleUpdatePortfolio = async (portfolioId: string, data: Partial<Portfolio>) => {
    try {
      const response = await portfolioService.updatePortfolio(portfolioId, data);
      if (response?.status === 200) {
        // Refresh portfolios after update
        const updatedPortfolios = await portfolioService.getMyPortfolioList();
        if (updatedPortfolios?.status === 200) {
          setPortfolios(updatedPortfolios?.data?.data?.portfolios);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const filteredPortfolios = portfolios.filter(portfolio => 
    accessFilter.length === 0 || accessFilter.includes(portfolio.access)
  );
  
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">All Portfolios</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hover:bg-gray-100">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Access Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={accessFilter.includes('public')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAccessFilter([...accessFilter, 'public']);
                  } else {
                    setAccessFilter(accessFilter.filter(type => type !== 'public'));
                  }
                }}
              >
                Public
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={accessFilter.includes('private')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAccessFilter([...accessFilter, 'private']);
                  } else {
                    setAccessFilter(accessFilter.filter(type => type !== 'private'));
                  }
                }}
              >
                Private
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            // Show 4 skeleton cards while loading (reduced from 6)
            [...Array(4)].map((_, index) => (
              <PortfolioSkeleton key={index} />
            ))
          ) : (
            filteredPortfolios.map((portfolio) => (
              <PortfolioCard 
                key={portfolio.portfolioId} 
                portfolio={portfolio} 
                onUpdate={handleUpdatePortfolio}
                setPortfolios={setPortfolios}
                type={type}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessFilter, setAccessFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const portfolios = await portfolioService.getMyPortfolioList();
        if(portfolios?.status === 200) {
          setPortfolios(portfolios?.data?.data?.portfolios);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);
  
  return (
    <div className="p-3">
      <Tabs defaultValue="gen-post">
        <ScrollArea>
          <TabsList className="mb-3">
            <TabsTrigger value="gen-post">
              <svg
                className="-ms-0.5 me-1.5 opacity-60"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Gen-Post Deployed
            </TabsTrigger>
            <TabsTrigger value="self">
              <svg
                className="-ms-0.5 me-1.5 opacity-60"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Self Deployed
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        <TabsContent value="gen-post">
          <PortfolioGrid 
            type="d"
            portfolios={portfolios.filter(p => !p.isDeployed)} 
            loading={loading}
            accessFilter={accessFilter}
            setAccessFilter={setAccessFilter}
            setPortfolios={setPortfolios}
          />
        </TabsContent>
        <TabsContent value="self">
          <PortfolioGrid 
            type="c"
            portfolios={portfolios.filter(p => p.isDeployed)} 
            loading={loading}
            accessFilter={[]}
            setAccessFilter={setAccessFilter}
            setPortfolios={setPortfolios}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}; 

export default Dashboard;  