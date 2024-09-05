'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";
import ThemeToggle from '@/components/Themetoggle'; // Ensure correct import
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from 'next/navigation';

// Dashboard component
export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState([]); // Initialize state as an array
  const [currentDay, setCurrentDay] = useState('Day 1');
  const router = useRouter();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost/attendance-api/get_attendance.php'); // Adjust the API endpoint as needed
        console.log('Attendance Data:', response.data); // Add this line for debugging
        setAttendanceData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [currentDay]); // Rerun the effect when currentDay changes

  // Function to change day (create a new table for Day 2)
  const endDayEvent = () => {
    setCurrentDay(`Day ${parseInt(currentDay.split(' ')[1]) + 1}`);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                  <PanelLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Menu</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  {/* Add more navigation links here */}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Flex container for Search bar and ThemeToggle */}
            <div className="flex items-center justify-between w-full">
              {/* Search bar */}
              <div className="relative w-full max-w-xs md:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full h-10 rounded-lg bg-background pl-8"
                />
              </div>

              {/* ThemeToggle with alignment */}
              <div className="ml-4">
                <ThemeToggle className="h-10 w-10 flex items-center justify-center" />
              </div>
            </div>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard - {currentDay}</CardTitle>
                <CardDescription>
                  Below is the list of students scanned via QR Code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NAME</TableHead>
                      <TableHead>STUDENT ID</TableHead>
                      <TableHead>SCHOOL YEAR</TableHead>
                      <TableHead>TRIBU</TableHead>
                      <TableHead>IN</TableHead>
                      <TableHead>OUT</TableHead>
                      <TableHead>STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.length > 0 ? (
                      attendanceData.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{`${entry.family_name}, ${entry.first_name.charAt(0)}.`}</TableCell>
                          <TableCell>{entry.student_id}</TableCell>
                          <TableCell>{entry.year_level}</TableCell>
                          <TableCell>{entry.tribu}</TableCell>
                          <TableCell>{entry.in_time || '---'}</TableCell>
                          <TableCell>{entry.out_time || '---'}</TableCell>
                          <TableCell>{entry.status}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="text-center mt-6">
                  <Button className="bg-black text-white" variant="outline" onClick={endDayEvent}>
                    End Day Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
