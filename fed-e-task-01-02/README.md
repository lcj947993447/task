1.
    工作原理：内部设置一个引用计数器，来维护当前对象的引用数，判断引用数是否为0即是否为垃圾
    优点：会在发现垃圾时立即回收 根据对象引用数是否为0判断垃圾，为0立即回收将内存释放
        最大限度的减少程序的暂停 
    缺点：无法将循环引用的对象回收掉
        消耗时间大  维护数值变化，时刻监控数值是否修改

2.
    遍历所有对象，将当前可达对象进行标记，遍历完成后先进行整理操作，移动对象位置让它们地址上产生连续，最后将无标记的垃圾对象直接清除

3.
    首先将新生代垃圾存储区分为两块等大的空间（使用空间：From；空闲空间To）， 活动对象存储于From中，To空闲，当From空间使用到25%时触发GC操作，先对From空间的活动对象进行标记，
    然后对活动对象进行整理，使位置变得连续（减少碎片化空间的产生），然后将From的对象拷贝至To空间，拷贝完成后将From进行完全释放，此时空间状态互换，From变为To，To变为From

4.
    使用时间：V8回收老生代对象时，首先使用标记清除完成垃圾空间的回收，当新生代对象进行晋升而老生代对象中的零散空间又出现空间不足的情况，就会进行标记整理操作，最后采用增量标记的方式对
    当前回收效率进行提升
    工作原理：将整段的垃圾回收操作拆分为多个小步骤，组合后完成对垃圾的回收。