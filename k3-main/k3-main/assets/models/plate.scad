use <utils/mirror_copy.scad>

module plate(thickness, matrixSize, switchSize, borderSize, spacing) {
    size = matrixSize*spacing+borderSize*2;
    union() {
        difference() {
            cube([size, size, thickness]);
            translate([
                borderSize+(spacing-switchSize)/2,
                borderSize+(spacing-switchSize)/2,
                -0.5
            ]) {
                for (i = [0 : 1 : matrixSize-1]) {
                    for (j = [0 : 1 : matrixSize-1]) {
                        translate([spacing*i, spacing*j, 0])
                            color("red")
                            cube([switchSize, switchSize, thickness+1]);
                    }
                }
            }
            translate([size/2, size/2, 0])
                mirror_copy([0, 1, 0])
                    mirror_copy([1, 0, 0])
                        translate([size/2, size/2, thickness/2])
                            cube([borderSize*2, borderSize*2, thickness+1], true);
        }
        
        for (i = [1 : 1 : matrixSize-1]) {
            translate([borderSize, spacing*i+borderSize-0.5, thickness])
                    cube([size-borderSize*2, 1, 1]);
            translate([borderSize, spacing*i+borderSize-0.5, -1])
                    cube([size-borderSize*2, 1, 1]);
            translate([spacing*i+borderSize-0.5, borderSize, thickness])
                cube([1, size-borderSize*2, 1]);
            translate([spacing*i+borderSize-0.5, borderSize, -1])
                cube([1, size-borderSize*2, 1]);
        }
    }        
}

plate(1.4, 4, 14.2, 2, 19);