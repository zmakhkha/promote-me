from django.contrib import admin

from.models import Tag, TagsPerUser, AppUser, Platform, UserPlatform, Follower
@admin.register(Tag)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(TagsPerUser)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(AppUser)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(Platform)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(UserPlatform)
class FriendshipAdmin(admin.ModelAdmin):
    pass
@admin.register(Follower)
class FriendshipAdmin(admin.ModelAdmin):
    pass