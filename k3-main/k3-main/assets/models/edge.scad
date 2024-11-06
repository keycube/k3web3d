use <utils/mirror_copy.scad>

module edge(radius, height, screwhole, thickness) {
    difference() {
        union() {
            // curved edge 
            difference() {
                cylinder(h = height, r = radius, center = true);
                
                translate([0, (radius+1)/2, 0])
                    cube([radius*2+1, radius+1, height+1], true);
                translate([(radius+1)/-2, (radius)/-2, 0])
                    cube([radius+1, radius+1, height+1], true);
                
                cylinder(h = height+1, r = radius-2, center = true);
            }
            
            // border
            translate([(radius-1)/2, -1, 0])
                cube([radius-1, 2, height], true);
            translate([1, (radius-1)/-2, 0])
                cube([2, radius-1, height], true);
            
            // inside fortification
            rotate([0, 0, -45])
            translate([radius/2+0.5, 0, 0])
                cube([radius-2, 2, height], true);
            
            // nut holder
            mirror_copy([0, 0, 1])
            translate([4, -4, height/2-2.5])
                cube([8, 8, 5], center = true);
            
            // plate holder
            translate([1.5, -12+5+1, 0])
                cube([3, 3, height], true);
            translate([12-5-1, -1.5, , 0])
                cube([3, 3, height], true);
        }
     
        // nut holder hole
        mirror_copy([0, 0, 1]) {
            translate([3.5+screwhole, -3.5-screwhole, height/2]) {            
                cylinder(r=screwhole, h=16, $fn=200, center = true);
                size = 4.2;
                nheight = 3;
                translate([0, 0, -1.5-1.25])

                rotate([0, 0, 135])
                    union() {
                        inradius = (size/2)/(sqrt(3)/2);
                        translate([size, 0, 0])
                            cube([size*2, size, nheight], center = true);
                        cylinder(r=inradius, h=nheight, $fn=6, center = true);
                    }
            }
        }
        
        // plate holder hole
        translate([1, -12+5+1-0.125, 0])
            cube([3, 1.75, height+1], true);
        translate([12-5-1+0.125, -1, , 0])
            cube([1.75, 3, height+1], true);

    }
}

edge(12, 76, 1.15, 1.25);

$fa = 0.5;
$fs = 0.15;

//use <corner.scad>
//translate([0, 0, 76/2])
//    corner(12, 1.15, 2.05, 1.25);