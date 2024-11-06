module corner(radius, screwhole, screwhead, thickness) {
    
    difference() {
        sphere(radius);        
        translate([0, 0, (radius+1)/-2])
            cube([radius*2+1, radius*2+1, radius+1], true);
        translate([(radius+1)/-2, 0, radius/2])
            cube([radius+1, radius*2+1, radius+1], true);
        translate([radius/2, (radius+1)/2, radius/2])
            cube([radius+1, radius+1, radius+1], true);
        
        
        translate([3.5+screwhole, -3.5-screwhole, radius/2])
            cylinder(h = radius+1, r = screwhole, center = true);
        translate([3.5+screwhole, radius/-2, 3.5+screwhole])
            rotate([90, 0, 0])
                cylinder(h = radius+1, r = screwhole, center = true);
        translate([radius/2, -3.5-screwhole , 3.5+screwhole])
            rotate([0, 90, 0])
                cylinder(h = radius+1, r = screwhole, center = true);
        
        translate([3.5+screwhole, -3.5-screwhole, (radius+1)/2+thickness])
            cylinder(h = radius+1, r = screwhead, center = true);
        translate([3.5+screwhole, (radius+1)/-2-thickness, 3.5+screwhole])
            rotate([90, 0, 0])
                cylinder(h = radius+1, r = screwhead, center = true);
        translate([(radius+1)/2+thickness, -3.5-screwhole , 3.5+screwhole])
            rotate([0, 90, 0])
                cylinder(h = radius+1, r = screwhead, center = true);
    }        
}

corner(12, 1.15, 2.05, 1.25);

$fa = 1.5;
$fs = 0.15;