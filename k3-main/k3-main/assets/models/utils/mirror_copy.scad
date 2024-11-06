// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Tips_and_Tricks
module mirror_copy(v = [1, 0, 0]) {
    children();
    mirror(v) children();
}