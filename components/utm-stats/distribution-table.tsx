"use client"

import type React from "react"
import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateColorPalette } from "@/utils/color-palette"

interface DistributionTableProps {
  data: Array<{ name: string; purchases: number; percentage: number }>
  title: string
}

const DistributionTable: React.FC<DistributionTableProps> = ({ data, title }) => {
  const colors = useMemo(() => generateColorPalette(data.length), [data.length])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{title} Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Purchases</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.name}>
                <TableCell>
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 mr-2 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    {item.name}
                  </div>
                </TableCell>
                <TableCell>{item.purchases}</TableCell>
                <TableCell>{item.percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DistributionTable

