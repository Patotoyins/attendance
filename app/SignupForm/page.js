'use client';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ThemeToggle from '@/components/Themetoggle';
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
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

export default function SignupForm() {
  const [yearLevels, setYearLevels] = useState([]);
  const [tribus, setTribus] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    password: '',
    first_name: '',
    middle_name: '',
    family_name: '',
    suffix: '',
    contact_info: '',
    phinmaed_email: '',
    year_level: '',
    tribu_id: '',
    roles: 'student' 
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios.get('http://localhost/attendance-api/get_year_levels.php')
      .then(response => setYearLevels(response.data))
      .catch(error => console.error('Error fetching year levels:', error));

    axios.get('http://localhost/attendance-api/get_tribus.php')
      .then(response => setTribus(response.data))
      .catch(error => console.error('Error fetching tribus:', error));
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.toString(),
    });
  };

  const validateForm = () => {
    const { student_id, password, first_name, family_name, contact_info, phinmaed_email, year_level } = formData;

    if (!(student_id.length >= 13 && student_id.length <= 14) || !student_id.startsWith('02-')) {
      toast.error("Invalid Student ID.");
      return false;
    }

    if (!phinmaed_email.endsWith(".coc@phinmaed.com")) {
      toast.error("Invalid PHINMAED email.");
      return false;
    }

    return student_id && password && first_name && family_name && contact_info && phinmaed_email && year_level;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    axios.post('http://localhost/attendance-api/signup.php', formData)
      .then(response => {
        if (response.data.success) {
          toast.success("Successfully Signed Up.");
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during signup:', error);
        toast.error("Signup Failed");
      });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center">
            <img src="/assets/cocicon.png" alt="Sign Up Icon" className="h-12 w-12 mr-3" />
            <CardTitle className="text-3xl font-black">Sign Up</CardTitle>
          </div>
          <CardDescription>Fill up the following information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="student-id">Student ID <span className="text-red-500">*</span></Label>
                <Input
                  id="student-id"
                  name="student_id"
                  value={formData.student_id}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  placeholder="02-2425-12345"
                  required
                />
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <div className="flex items-center">
                  <Checkbox id="show-password" onCheckedChange={(checked) => setShowPassword(!!checked)} />
                  <Label htmlFor="show-password" className="ml-2">Show Password</Label>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name <span className="text-red-500">*</span></Label>
                <Input
                  id="first-name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="middle-name">Middle Name</Label>
                <Input
                  id="middle-name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="family-name">Family Name <span className="text-red-500">*</span></Label>
                <Input
                  id="family-name"
                  name="family_name"
                  value={formData.family_name}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  name="suffix"
                  value={formData.suffix}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
              </div>
            </div>

            {/* PHINMAED Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="phinmaed-email">PHINMAED Email <span className="text-red-500">*</span></Label>
              <Input
                id="phinmaed-email"
                name="phinmaed_email"
                value={formData.phinmaed_email}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                placeholder="example.coc@phinmaed.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-info">Contact Info <span className="text-red-500">*</span></Label>
              <Input
                id="contact-info"
                name="contact_info"
                value={formData.contact_info}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                required
              />
            </div>

            {/* Year Level and Tribu Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year-level">Year Level <span className="text-red-500">*</span></Label>
                <Select onValueChange={(value) => handleInputChange('year_level', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year Levels</SelectLabel>
                      {yearLevels.map(level => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.level_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tribu">Tribu</Label>
                <Select onValueChange={(value) => handleInputChange('tribu_id', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Tribu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tribus</SelectLabel>
                      {tribus.map(tribu => (
                        <SelectItem key={tribu.id} value={tribu.id.toString()}>
                          {tribu.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="w-full">Create an account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Signup</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to create this account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account? <Link href="/login" className="underline font-bold">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
